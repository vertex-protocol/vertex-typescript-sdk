import { Wallet } from 'ethers';
import { nowInSeconds, toFixedPoint } from '@vertex-protocol/utils';
import { OrderActionParams } from '../apis/market';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { getOrderNonce } from '@vertex-protocol/engine-client';
import { VertexClient } from '../client';

export async function wsSanity(signer: Wallet, vertexClient: VertexClient) {
  const orderParams: OrderActionParams['order'] = {
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
    wsOrder,
  );

  const wsPlaceOrderReq = (
    await vertexClient.ws.execute.buildPlaceOrderPayload({
      productId: 1,
      order: wsOrder,
      signature: wsOrderSig,
    })
  ).payload;

  console.log(
    `Place Order WS request: ${JSON.stringify(wsPlaceOrderReq, null, 2)}`,
  );

  const wsOrderDigest = await vertexClient.context.engineClient.getOrderDigest(
    wsOrder,
    verifyingAddr,
  );

  const wsCancelOrdersReq =
    await vertexClient.ws.execute.buildCancelOrdersPayload({
      subaccountOwner: await signer.getAddress(),
      subaccountName: 'default',
      productIds: [1],
      digests: [wsOrderDigest],
      signature: '',
    });

  console.log(
    `Cancel Orders WS request: ${JSON.stringify(wsCancelOrdersReq, null, 2)}`,
  );

  const wsMintLpReq = await vertexClient.ws.execute.buildMintLpPayload({
    productId: 1,
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    signature: '',
  });

  console.log(`Mint LP WS request: ${JSON.stringify(wsMintLpReq, null, 2)}`);

  const wsBurnLpReq = await vertexClient.ws.execute.buildBurnLpPayload({
    productId: 1,
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    amount: toFixedPoint(1, 18),
    signature: '',
  });

  console.log(`Burn LP WS request: ${JSON.stringify(wsBurnLpReq, null, 2)}`);

  const wsWithdrawCollateralReq =
    await vertexClient.ws.execute.buildWithdrawCollateralPayload({
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

  const wsQuerySubaccountInfoReq = vertexClient.ws.query.buildQueryPayload(
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

  const wsTradeStream = vertexClient.ws.subscription.buildStreamPayload(
    'trade',
    {
      product_id: 0,
    },
  );
  const wsTradeSubscriptionReq =
    vertexClient.ws.subscription.buildSubscriptionPayload(
      'subscribe',
      1,
      wsTradeStream,
    );

  console.log(
    `Trade subscription WS request: ${JSON.stringify(
      wsTradeSubscriptionReq,
      null,
      2,
    )}`,
  );

  const wsFillStream = vertexClient.ws.subscription.buildStreamPayload('fill', {
    product_id: 1,
    subaccount:
      '0x3b69d1a1021a1979cc6e16987ce0fcfa8875484064656661756c740000000000',
  });
  const wsFillUnsubscribeReq =
    vertexClient.ws.subscription.buildSubscriptionPayload(
      'unsubscribe',
      1,
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
    vertexClient.ws.subscription.buildSubscriptionPayload('list', 1, {});

  console.log(
    `Lists subscriptions WS request: ${JSON.stringify(
      wsListSubscriptionsReq,
      null,
      2,
    )}`,
  );
}
