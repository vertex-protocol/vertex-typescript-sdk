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
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';

async function wsMessageTests(context: RunContext) {
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
    expiration: nowInSeconds() + 60,
    price: 28000,
    amount: addDecimals(0.01),
  };

  const contracts = await vertexClient.context.engineClient.getContracts();
  // Address for product ID of 1
  const verifyingAddr = contracts.orderbookAddrs[1];

  const wsOrder = {
    ...orderParams,
    subaccountOwner: walletClientAddress,
    nonce: getOrderNonce(),
  };
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

  prettyPrint('Place Order WS request', wsPlaceOrderReq);

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

  prettyPrint('Cancel Order WS request', wsCancelOrdersReq);

  const wsMintLpReq = await vertexClient.ws.execute.buildMintLpMessage({
    productId: 1,
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    amountBase: addDecimals(1),
    quoteAmountLow: addDecimals(1000),
    quoteAmountHigh: addDecimals(2000),
    signature: '',
  });

  prettyPrint('Mint LP WS request', wsMintLpReq);

  const wsBurnLpReq = await vertexClient.ws.execute.buildBurnLpMessage({
    productId: 1,
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    amount: addDecimals(1),
    signature: '',
  });

  prettyPrint('Burn LP WS request', wsBurnLpReq);

  const wsWithdrawCollateralReq =
    await vertexClient.ws.execute.buildWithdrawCollateralMessage({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
      productId: 0,
      amount: addDecimals(4999),
      signature: '',
    });

  prettyPrint('Withdraw Collateral WS request', wsWithdrawCollateralReq);

  const wsQuerySubaccountInfoReq = vertexClient.ws.query.buildQueryMessage(
    'subaccount_info',
    {
      subaccount: subaccountToHex({
        subaccountOwner: walletClientAddress,
        subaccountName: 'default',
      }),
    },
  );

  prettyPrint('Query subaccount info WS request', wsQuerySubaccountInfoReq);

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
  prettyPrint('Trade subscription WS request', wsTradeSubscriptionReq);

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

  prettyPrint('Fill unsubscribe WS request', wsFillUnsubscribeReq);

  const wsListSubscriptionsReq =
    vertexClient.ws.subscription.buildSubscriptionMessage(1, 'list', {});

  prettyPrint('List subscriptions WS request', wsListSubscriptionsReq);
}

void runWithContext(wsMessageTests);
