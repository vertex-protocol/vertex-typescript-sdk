import {
  addDecimals,
  createVertexClient,
  PlaceOrderParams,
  VertexClient,
} from '@vertex-protocol/client';
import { getOrderDigest, getOrderNonce } from '@vertex-protocol/contracts';
import { getExpiration } from '../utils/getExpiration';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import test from 'node:test';
import { debugPrint } from '../utils/debugPrint';

async function orderTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;

  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const chainId = walletClient.chain.id;
  const walletClientAddress = walletClient.account.address;

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
    amount: addDecimals(-3.5),
  };

  const orderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    productId: spotOrderProductId,
  });

  debugPrint('Place order result', orderResult);

  const orderCustomIdResult = await vertexClient.market.placeOrder({
    id: 100,
    order: orderParams,
    productId: spotOrderProductId,
  });

  debugPrint('Place order w/ custom id result', orderCustomIdResult);

  const subaccountOrders =
    await vertexClient.context.engineClient.getSubaccountOrders({
      productId: spotOrderProductId,
      subaccountName: 'default',
      subaccountOwner: walletClientAddress,
    });

  debugPrint('Subaccount orders', subaccountOrders);

  console.log(`Cancelling order`);
  const cancelResult = await vertexClient.market.cancelOrders({
    digests: subaccountOrders.orders.map((order) => order.digest),
    productIds: subaccountOrders.orders.map((order) => order.productId),
    subaccountName: 'default',
  });

  debugPrint('Cancel order result', cancelResult);

  const perpOrderProductId = 4;

  const perpOrderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    productId: perpOrderProductId,
  });

  debugPrint('Place perp order result', perpOrderResult);

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

  debugPrint('Cancel and place order result', cancelAndPlaceResult);
}

void test('[client]: Running order tests', () => runWithContext(orderTests));
