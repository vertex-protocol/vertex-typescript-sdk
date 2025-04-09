import {
  createVertexClient,
  PlaceOrderParams,
  VertexClient,
} from '@vertex-protocol/client';
import {
  getOrderDigest,
  getOrderNonce,
  getVertexEIP712Values,
} from '@vertex-protocol/contracts';
import { addDecimals, toBigInt, toIntegerString } from '@vertex-protocol/utils';
import { encodeAbiParameters, encodePacked, parseAbiParameters } from 'viem';
import { getExpiration } from '../utils/getExpiration';
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { waitForTransaction } from '../utils/waitForTransaction';

async function fullSanity(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;

  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const chainId = walletClient.chain.id;
  const walletClientAddress = walletClient.account.address;

  console.log('Minting tokens...');
  await waitForTransaction(
    vertexClient.spot._mintMockERC20({
      // 20000 tokens
      amount: addDecimals(20000, 6),
      productId: 0,
    }),
    publicClient,
  );

  console.log('Approving allowance...');
  await waitForTransaction(
    vertexClient.spot.approveAllowance({
      amount: addDecimals(20000, 6),
      productId: 0,
    }),
    publicClient,
  );

  console.log('Depositing tokens with referral code...');
  await waitForTransaction(
    vertexClient.spot.deposit({
      subaccountName: 'default',
      productId: 0,
      amount: addDecimals(10000, 6),
      referralCode: 'Blk23MeZU3',
    }),
    publicClient,
  );

  const referralCode =
    await vertexClient.context.contracts.endpoint.read.referralCodes([
      walletClientAddress,
    ]);

  prettyPrint('Referral code', referralCode);

  console.log('Depositing tokens...');
  await waitForTransaction(
    vertexClient.spot.deposit({
      subaccountName: 'default',
      productId: 0,
      amount: addDecimals(10000, 6),
    }),
    publicClient,
  );

  const allMarkets = await vertexClient.market.getAllMarkets();

  console.log('Placing order...');
  const spotOrderProductId = 3;
  const spotOrderProductOraclePrice = allMarkets.find(
    (market) => market.productId === spotOrderProductId,
  )!.product.oraclePrice;
  const spotOrderShortLimitPrice = spotOrderProductOraclePrice
    .multipliedBy(1.1)
    .decimalPlaces(0);
  const orderNonce = getOrderNonce();
  const orderParams: PlaceOrderParams['order'] = {
    subaccountName: 'default',
    expiration: toIntegerString(getExpiration('post_only', 60)),
    price: spotOrderShortLimitPrice,
    amount: addDecimals(-3.5),
  };

  const orderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    productId: spotOrderProductId,
    nonce: orderNonce,
  });

  prettyPrint('Place order result', orderResult);

  console.log('Placing order with custom id...');

  const orderCustomIdResult = await vertexClient.market.placeOrder({
    id: 100,
    order: {
      subaccountName: 'default',
      expiration: toIntegerString(getExpiration('post_only', 60)),
      price: spotOrderShortLimitPrice,
      amount: addDecimals(-3.5),
    },
    productId: spotOrderProductId,
    nonce: getOrderNonce(),
  });

  prettyPrint('Place order custom id result', orderCustomIdResult);

  const subaccountOrders =
    await vertexClient.context.engineClient.getSubaccountOrders({
      productId: spotOrderProductId,
      subaccountName: 'default',
      subaccountOwner: walletClientAddress,
    });

  prettyPrint('Subaccount orders', subaccountOrders);

  const verifyingAddr =
    await vertexClient.context.engineClient.getOrderbookAddress(
      spotOrderProductId,
    );

  const digest = getOrderDigest({
    order: orderResult.orderParams,
    verifyingAddr,
    chainId,
  });

  prettyPrint('Order digest', digest);

  console.log(`Cancelling order`);
  const cancelResult = await vertexClient.market.cancelOrders({
    digests: [digest],
    productIds: [spotOrderProductId],
    subaccountName: 'default',
  });

  prettyPrint('Cancel order result', cancelResult);

  const perpOrderProductId = 4;

  const perpOrderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    productId: perpOrderProductId,
    nonce: getOrderNonce(),
  });

  prettyPrint('Place perp order result', perpOrderResult);

  const perpOrderDigest = getOrderDigest({
    order: perpOrderResult.orderParams,
    verifyingAddr:
      await vertexClient.context.engineClient.getOrderbookAddress(
        perpOrderProductId,
      ),
    chainId,
  });

  console.log(`Cancelling and placing orders in single request`);
  const cancelAndPlaceResult = await vertexClient.market.cancelAndPlace({
    cancelOrders: {
      digests: [perpOrderDigest],
      productIds: [perpOrderProductId],
      subaccountName: 'default',
    },
    placeOrder: {
      order: orderParams,
      productId: spotOrderProductId,
      nonce: getOrderNonce(),
    },
  });

  prettyPrint('Cancel and place order result', cancelAndPlaceResult);

  // Fetches state from offchain sequencer
  await vertexClient.market.getAllEngineMarkets();
  await vertexClient.market.getEdgeAllEngineMarkets();
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
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });
  // Subaccount state from Arbitrum
  await vertexClient.subaccount.getSubaccountSummary({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });

  await vertexClient.market.getOpenSubaccountOrders({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    productId: spotOrderProductId,
  });
  await vertexClient.market.getOpenSubaccountMultiProductOrders({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    productIds: [1, 2, 3],
  });
  await vertexClient.spot.withdraw({
    subaccountName: 'default',
    productId: 0,
    amount: addDecimals(1000, 6),
  });

  const nSubmissions =
    await vertexClient.context.contracts.endpoint.read.nSubmissions();

  prettyPrint('nSubmissions', nSubmissions);

  const engineTime = await vertexClient.context.engineClient.getTime();

  prettyPrint('Engine time', engineTime);

  const perpSymbols = await vertexClient.context.engineClient.getSymbols({
    productType: 1,
  });

  prettyPrint('Perp symbols', perpSymbols);

  const spotSymbols = await vertexClient.context.engineClient.getSymbols({
    productType: 0,
  });

  prettyPrint('Spot symbols', spotSymbols);

  // TODO: refactor / move multi-part examples to a `utils` sub-folder to keep sanity tests cleaner
  console.log('Slow mode withdrawal');
  // 1. approve 1 USDC for submitting slow-mode tx
  console.log('Approving 1 USDC allowance...');
  await waitForTransaction(
    vertexClient.spot.approveAllowance({
      amount: addDecimals(1, 6),
      productId: 0,
    }),
    publicClient,
  );

  // 2. generate withdraw collateral tx
  const tx = getVertexEIP712Values('withdraw_collateral', {
    amount: addDecimals(1000, 6),
    nonce: await vertexClient.context.engineClient.getTxNonce(),
    productId: 0,
    subaccountName: 'default',
    subaccountOwner: walletClientAddress,
  });

  const encodedTx = encodeAbiParameters(
    parseAbiParameters('bytes32, uint32, uint128, uint64'),
    [tx.sender, tx.productId, toBigInt(tx.amount), toBigInt(tx.nonce)],
  );
  const encodedSlowModeTx = encodePacked(
    ['uint8', 'bytes'],
    [
      // Withdraw collateral enum value
      2,
      encodedTx,
    ],
  );

  console.log('Submitting Slow mode withdrawal...');
  // 3. submit via slow-mode
  const txResp =
    await vertexClient.context.contracts.endpoint.write.submitSlowModeTransaction(
      [encodedSlowModeTx],
    );

  prettyPrint('Slow mode withdrawal Tx Response', txResp);
}

runWithContext(fullSanity);
