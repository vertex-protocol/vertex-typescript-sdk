import {
  createVertexClient,
  PlaceOrderParams,
  VertexClient,
} from '@vertex-protocol/client';
import { getOrderDigest, getOrderNonce } from '@vertex-protocol/contracts';
import { toFixedPoint } from '@vertex-protocol/utils';
import { getExpiration } from '../utils/getExpiration';
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { waitForTransaction } from '../utils/waitForTransaction';

async function orderTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;

  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const chainId = walletClient.chain.id;
  const walletClientAddress = walletClient.account.address;

  console.log('Setting up account');

  const initialDepositAmt = toFixedPoint(1000, 6);
  await waitForTransaction(
    vertexClient.spot._mintMockERC20({
      amount: initialDepositAmt,
      productId: 0,
    }),
    publicClient,
  );
  await waitForTransaction(
    vertexClient.spot.approveAllowance({
      amount: initialDepositAmt,
      productId: 0,
    }),
    publicClient,
  );
  await waitForTransaction(
    vertexClient.spot.deposit({
      subaccountName: 'default',
      productId: 0,
      amount: initialDepositAmt,
    }),
    publicClient,
  );

  // Query all markets for price information
  const allMarkets = await vertexClient.market.getAllMarkets();

  // Place spot order
  const spotOrderProductId = 3;
  const spotOrderProductOraclePrice = allMarkets.find(
    (market) => market.productId === spotOrderProductId,
  )!.product.oraclePrice;

  const shortLimitPrice = spotOrderProductOraclePrice
    .multipliedBy(1.1)
    .decimalPlaces(0);
  const shortMarketPrice = spotOrderProductOraclePrice
    .multipliedBy(0.9)
    .decimalPlaces(0);

  // This can be shared with spot & perp because 3 & 4 are both BTC
  const orderParams: PlaceOrderParams['order'] = {
    subaccountName: 'default',
    expiration: getExpiration('post_only', 60).toString(),
    price: shortLimitPrice,
    amount: toFixedPoint(-3.5),
  };

  const orderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    productId: spotOrderProductId,
  });

  prettyPrint('Place order result', orderResult);

  const orderCustomIdResult = await vertexClient.market.placeOrder({
    id: 100,
    order: orderParams,
    productId: spotOrderProductId,
  });

  prettyPrint('Place order w/ custom id result', orderCustomIdResult);

  const subaccountOrders =
    await vertexClient.context.engineClient.getSubaccountOrders({
      productId: spotOrderProductId,
      subaccountName: 'default',
      subaccountOwner: walletClientAddress,
    });

  prettyPrint('Subaccount orders', subaccountOrders);

  console.log(`Cancelling order`);
  const cancelResult = await vertexClient.market.cancelOrders({
    digests: subaccountOrders.orders.map((order) => order.digest),
    productIds: subaccountOrders.orders.map((order) => order.productId),
    subaccountName: 'default',
  });

  prettyPrint('Cancel order result', cancelResult);

  const perpOrderProductId = 4;

  const perpOrderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    productId: perpOrderProductId,
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

  const cancelAndPlaceResult = await vertexClient.market.cancelAndPlace({
    cancelOrders: {
      digests: [perpOrderDigest],
      productIds: [perpOrderProductId],
      subaccountName: 'default',
    },
    placeOrder: {
      // Place a market order
      order: {
        ...orderParams,
        expiration: getExpiration('fok', 60).toString(),
        price: shortMarketPrice,
      },
      productId: perpOrderProductId,
      nonce: getOrderNonce(),
    },
  });

  prettyPrint('Cancel and place order result', cancelAndPlaceResult);

  await vertexClient.spot.withdraw({
    subaccountName: 'default',
    productId: 0,
    // 1 USDC withdrawal fee
    amount: initialDepositAmt - toFixedPoint(1, 6),
  });
}

runWithContext(orderTests);
