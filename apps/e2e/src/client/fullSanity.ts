import { RunContext } from '../utils/types';
import {
  bytesToStr,
  getExpirationTimestamp,
  getOrderNonce,
} from '@vertex-protocol/contracts';
import { toFixedPoint } from '@vertex-protocol/utils';
import { runWithContext } from '../utils/runWithContext';
import {
  createVertexClient,
  getProductMetadataByProductId,
  PlaceOrderParams,
} from '@vertex-protocol/client';

async function fullSanity(context: RunContext) {
  const signer = context.getWallet();
  const vertexClient = await createVertexClient(context.env.chainEnv, {
    signerOrProvider: signer,
  });

  const chainId = await signer.getChainId();

  console.log('Minting tokens...');
  const mintTx = await vertexClient.spot._mintMockERC20({
    // 20000 tokens
    amount: toFixedPoint(20000, 6),
    productId: 0,
  });
  await mintTx.wait();

  console.log('Approving allowance...');
  const approveTx = await vertexClient.spot.approveAllowance({
    amount: toFixedPoint(20000, 6),
    productId: 0,
  });
  await approveTx.wait();

  console.log('Depositing tokens with referral code...');
  const depositWithReferralTx = await vertexClient.spot.deposit({
    subaccountName: 'default',
    productId: 0,
    amount: toFixedPoint(10000, 6),
    referralCode: 'Blk23MeZU3',
  });
  await depositWithReferralTx.wait();

  const referralCode =
    await vertexClient.context.contracts.endpoint.referralCodes(signer.address);

  console.log('Referral code:', referralCode);

  console.log('Depositing tokens...');
  const depositTx = await vertexClient.spot.deposit({
    subaccountName: 'default',
    productId: 0,
    amount: toFixedPoint(10000, 6),
  });
  await depositTx.wait();

  console.log('Placing order...');
  const orderNonce = getOrderNonce();

  const orderParams: PlaceOrderParams['order'] = {
    subaccountName: 'default',
    expiration: getExpirationTimestamp('post_only', Date.now() / 1000 + 60),
    // Limit price
    price: 2000,
    amount: toFixedPoint(-3.5),
  };

  const orderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    // Product you're sending the order for
    productId: 3,
    nonce: orderNonce,
  });

  console.log(`Place order result: ${JSON.stringify(orderResult, null, 2)}`);

  const subaccountOrders =
    await vertexClient.context.engineClient.getSubaccountOrders({
      productId: 3,
      subaccountName: 'default',
      subaccountOwner: signer.address,
    });

  console.log('Subaccount orders', JSON.stringify(subaccountOrders));

  const verifyingAddr =
    await vertexClient.context.engineClient.getOrderbookAddress(3);

  const digest = vertexClient.context.engineClient.getOrderDigest(
    orderResult.orderParams,
    verifyingAddr,
    chainId,
  );

  console.log(`Order digest: ${digest}`);

  console.log(`Cancelling order`);
  await vertexClient.market.cancelOrders({
    digests: [digest],
    productIds: [3],
    subaccountName: 'default',
  });

  console.log(`Order cancelled`);

  // Fetches state from offchain sequencer
  await vertexClient.market.getAllEngineMarkets();
  await vertexClient.market.getLatestMarketPrices({ productIds: [1, 2, 3] });

  // Fetches state from Arbitrum
  await vertexClient.market.getAllMarkets();
  await vertexClient.market.getLatestMarketPrice({ productId: 3 });
  await vertexClient.market.getMarketLiquidity({
    productId: 3,
    // Per side of the book
    depth: 100,
  });

  // Subaccount state from engine
  await vertexClient.subaccount.getEngineSubaccountSummary({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });
  // Subaccount state from Arbitrum
  await vertexClient.subaccount.getSubaccountSummary({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });

  await vertexClient.market.getOpenSubaccountOrders({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    productId: 3,
  });
  await vertexClient.market.getOpenSubaccountProductOrders({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    productIds: [1, 2, 3],
  });
  await vertexClient.spot.withdraw({
    subaccountName: 'default',
    productId: 0,
    amount: toFixedPoint(1000, 6),
  });

  console.log('Products metadata (spot)');
  const spotProductId = 1;
  console.log(getProductMetadataByProductId('testnet', spotProductId));
  console.log(getProductMetadataByProductId('mainnet', spotProductId));

  console.log('Products metadata (perp)');
  const perpProductId = 2;
  console.log(getProductMetadataByProductId('testnet', perpProductId));
  console.log(getProductMetadataByProductId('mainnet', perpProductId));

  console.log('Invalid product');
  const invalidProductId = 10000;
  console.log(getProductMetadataByProductId('testnet', invalidProductId));
  console.log(getProductMetadataByProductId('mainnet', invalidProductId));

  const nSubmissions =
    await vertexClient.context.contracts.endpoint.nSubmissions();

  console.log(`nSubmissions: ${nSubmissions}`);

  const engineTime = await vertexClient.context.engineClient.getTime();

  console.log(`Engine time: ${engineTime}`);
}

runWithContext(fullSanity);
