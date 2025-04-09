import {
  createVertexClient,
  PlaceOrderParams,
  VertexClient,
} from '@vertex-protocol/client';
import {
  getOrderDigest,
  getOrderNonce,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import { addDecimals, nowInSeconds } from '@vertex-protocol/utils';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';

async function wsSanity(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;
  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const chainId = walletClient.chain.id;
  const walletClientAddress = walletClient.account.address;

  const orderParams: PlaceOrderParams['order'] = {
    subaccountName: 'default',
    // `nowInSeconds` is exposed by the `@vertex-protocol/utils` package
    // This gives 60s before the order expires
    expiration: nowInSeconds() + 60,
    // Limit price
    price: 28000,
    amount: addDecimals(0.01),
  };

  const verifyingAddr = (await vertexClient.context.engineClient.getContracts())
    .orderbookAddrs[1];

  // Websocket payloads
  const wsOrder = {
    ...orderParams,
    subaccountOwner: walletClientAddress,
    nonce: getOrderNonce(),
  };

  console.log(`WS Order ${JSON.stringify(wsOrder, null, 2)}`);

  const wsOrderSig = await vertexClient.context.engineClient.sign(
    'place_order',
    verifyingAddr,
    chainId,
    wsOrder,
  );

  const wsPlaceOrderReq = vertexClient.ws.execute.buildPlaceOrderMessage({
    productId: 1,
    order: wsOrder,
    signature: wsOrderSig,
  }).payload;

  console.log(
    `Place Order WS request: ${JSON.stringify(wsPlaceOrderReq, null, 2)}`,
  );

  const wsOrderDigest = getOrderDigest({
    order: wsOrder,
    verifyingAddr,
    chainId,
  });

  const wsCancelOrdersReq = vertexClient.ws.execute.buildCancelOrdersMessage({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    productIds: [1],
    digests: [wsOrderDigest],
    signature: '',
    nonce: getOrderNonce(),
  });

  console.log(
    `Cancel Orders WS request: ${JSON.stringify(wsCancelOrdersReq, null, 2)}`,
  );

  const wsMintLpReq = await vertexClient.ws.execute.buildMintLpMessage({
    productId: 1,
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    amountBase: addDecimals(1),
    quoteAmountLow: addDecimals(1000),
    quoteAmountHigh: addDecimals(2000),
    signature: '',
  });

  console.log(`Mint LP WS request: ${JSON.stringify(wsMintLpReq, null, 2)}`);

  const wsBurnLpReq = await vertexClient.ws.execute.buildBurnLpMessage({
    productId: 1,
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    amount: addDecimals(1),
    signature: '',
  });

  console.log(`Burn LP WS request: ${JSON.stringify(wsBurnLpReq, null, 2)}`);

  const wsWithdrawCollateralReq =
    await vertexClient.ws.execute.buildWithdrawCollateralMessage({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
      productId: 0,
      amount: addDecimals(4999),
      signature: '',
    });

  console.log(
    `Withdraw collateral WS request: ${JSON.stringify(
      wsWithdrawCollateralReq,
      null,
      2,
    )}`,
  );

  const wsQuerySubaccountInfoReq = vertexClient.ws.query.buildQueryMessage(
    'subaccount_info',
    {
      subaccount: subaccountToHex({
        subaccountOwner: walletClientAddress,
        subaccountName: 'default',
      }),
    },
  );

  console.log(
    `Query subaccount info WS request: ${JSON.stringify(
      wsQuerySubaccountInfoReq,
      null,
      2,
    )}`,
  );

  const wsTradeStream = vertexClient.ws.subscription.buildSubscriptionParams(
    'trade',
    {
      product_id: 0,
    },
  );
  const wsTradeSubscriptionReq =
    vertexClient.ws.subscription.buildSubscriptionMessage(
      1,
      'subscribe',
      wsTradeStream,
    );

  console.log(
    `Trade subscription WS request: ${JSON.stringify(
      wsTradeSubscriptionReq,
      null,
      2,
    )}`,
  );

  const wsFillStream = vertexClient.ws.subscription.buildSubscriptionParams(
    'fill',
    {
      product_id: 1,
      subaccount:
        '0x3b69d1a1021a1979cc6e16987ce0fcfa8875484064656661756c740000000000',
    },
  );
  const wsFillUnsubscribeReq =
    vertexClient.ws.subscription.buildSubscriptionMessage(
      1,
      'unsubscribe',
      wsFillStream,
    );

  console.log(
    `Fill unsubscribe WS request: ${JSON.stringify(
      wsFillUnsubscribeReq,
      null,
      2,
    )}`,
  );

  const wsListSubscriptionsReq =
    vertexClient.ws.subscription.buildSubscriptionMessage(1, 'list', {});

  console.log(
    `Lists subscriptions WS request: ${JSON.stringify(
      wsListSubscriptionsReq,
      null,
      2,
    )}`,
  );
}

runWithContext(wsSanity);
