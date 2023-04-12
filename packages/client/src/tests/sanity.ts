import { Wallet, ethers } from 'ethers';
import { toFixedPoint } from '@vertex-protocol/utils';
import { PlaceOrderParams } from '../apis/market';
import { Endpoint, getExpirationTimestamp } from '@vertex-protocol/contracts';
import { getProductMetadataByProductId } from '../utils';
import { getOrderNonce } from '@vertex-protocol/engine-client';
import { VertexClient } from '../client';
import { Endpoint__factory } from '@vertex-protocol/contracts';

export async function fullSanity(signer: Wallet, vertexClient: VertexClient) {
  console.log('Running full sanity...');

  const chainId = await signer.getChainId();

  console.log('Minting tokens...');
  const mintTx = await vertexClient.spot._mintMockERC20({
    // 10 tokens
    amount: toFixedPoint(10, 6),
    productId: 0,
  });
  await mintTx.wait();

  console.log('Approving allowance...');
  const approveTx = await vertexClient.spot.approveAllowance({
    amount: toFixedPoint(10000, 6),
    productId: 0,
  });
  await approveTx.wait();

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
    price: 1800,
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
  await vertexClient.market.cancelOrders({
    digests: [digest],
    productIds: [3],
    subaccountName: 'default',
  });

  // Fetches state from offchain sequencer
  await vertexClient.market.getAllEngineMarkets();
  // Fetches state from Arbitrum
  await vertexClient.market.getAllMarkets();
  await vertexClient.market.getLatestMarketPrice({ productId: 3 });
  await vertexClient.market.getMarketLiquidity({
    productId: 3,
    // Per side of the book
    depth: 100,
  });

  // State from engine
  await vertexClient.subaccount.getEngineSubaccountSummary({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });
  // State from Arbitrum
  await vertexClient.subaccount.getSubaccountSummary({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });
  await vertexClient.market.getOpenSubaccountOrders({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    productId: 3,
  });

  await vertexClient.context.graph.getSubaccountOrders({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });

  await vertexClient.spot.withdraw({
    subaccountName: 'default',
    productId: 0,
    amount: toFixedPoint(1000, 6),
  });

  console.log('Products metatada (spot)');
  const spotProductId = 1;
  console.log(getProductMetadataByProductId('testnet', spotProductId));
  console.log(getProductMetadataByProductId('mainnet', spotProductId));

  console.log('Products metatada (perp)');
  const perpProductId = 2;
  console.log(getProductMetadataByProductId('testnet', perpProductId));
  console.log(getProductMetadataByProductId('mainnet', perpProductId));

  console.log('Invalid product');
  const invalidProductId = 10000;
  console.log(getProductMetadataByProductId('testnet', invalidProductId));
  console.log(getProductMetadataByProductId('mainnet', invalidProductId));

  const endpoint = await Endpoint__factory.connect(
    vertexClient.context.contracts.endpoint.address,
    vertexClient.context.signerOrProvider,
  );

  const nSubmissions = await endpoint.nSubmissions();

  console.log(`nSubmissions: ${nSubmissions}`);
}
