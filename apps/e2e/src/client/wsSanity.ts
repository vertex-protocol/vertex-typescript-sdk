import { RunContext } from '../utils/types';
import { getOrderNonce } from '@vertex-protocol/engine-client';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { nowInSeconds, toFixedPoint } from '@vertex-protocol/utils';
import { runWithContext } from '../utils/runWithContext';
import { createVertexClient, PlaceOrderParams } from '@vertex-protocol/client';

async function wsSanity(context: RunContext) {
  const signer = context.getWallet();
  const vertexClient = await createVertexClient(context.env.chainEnv, {
    signerOrProvider: signer,
  });

  const chainId = await signer.getChainId();

  const orderParams: PlaceOrderParams['order'] = {
    subaccountName: 'default',
    // `nowInSeconds` is exposed by the `@vertex-protocol/utils` package
    // This gives 60s before the order expires
    expiration: nowInSeconds() + 60,
    // Limit price
    price: 28000,
    amount: toFixedPoint(0.01),
  };

  const verifyingAddr = (await vertexClient.context.engineClient.getContracts())
    .orderbookAddrs[1];

  // Websocket payloads
  const wsOrder = {
    ...orderParams,
    subaccountOwner: await signer.getAddress(),
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

  const wsOrderDigest = vertexClient.context.engineClient.getOrderDigest(
    wsOrder,
    verifyingAddr,
    chainId,
  );

  const wsCancelOrdersReq = vertexClient.ws.execute.buildCancelOrdersMessage({
    subaccountOwner: await signer.getAddress(),
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
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    signature: '',
  });

  console.log(`Mint LP WS request: ${JSON.stringify(wsMintLpReq, null, 2)}`);

  const wsBurnLpReq = await vertexClient.ws.execute.buildBurnLpMessage({
    productId: 1,
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    amount: toFixedPoint(1, 18),
    signature: '',
  });

  console.log(`Burn LP WS request: ${JSON.stringify(wsBurnLpReq, null, 2)}`);

  const wsWithdrawCollateralReq =
    await vertexClient.ws.execute.buildWithdrawCollateralMessage({
      subaccountOwner: signer.address,
      subaccountName: 'default',
      productId: 0,
      amount: toFixedPoint(4999, 6),
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
        subaccountOwner: signer.address,
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
