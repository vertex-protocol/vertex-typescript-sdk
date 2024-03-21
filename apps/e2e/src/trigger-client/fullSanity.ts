import {
  depositCollateral,
  Endpoint__factory,
  getChainIdFromSigner,
  getOrderDigest,
  getTriggerOrderNonce,
  IClearinghouse__factory,
  MockERC20__factory,
} from '@vertex-protocol/contracts';
import { EngineOrderParams } from '@vertex-protocol/engine-client';
import {
  TriggerClient,
  TriggerPlaceOrderParams,
} from '@vertex-protocol/trigger-client';
import { toFixedPoint, toX18 } from '@vertex-protocol/utils';
import { getExpiration } from '../utils/getExpiration';
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';

async function fullSanity(context: RunContext) {
  const signer = context.getWallet();
  const chainId = await getChainIdFromSigner(signer);

  const client = new TriggerClient({
    url: context.endpoints.trigger,
    signer,
  });

  const clearinghouse = await IClearinghouse__factory.connect(
    context.contracts.clearinghouse,
    signer,
  );
  const quote = await MockERC20__factory.connect(
    await clearinghouse.getQuote(),
    signer,
  );
  const endpointAddr = context.contracts.endpoint;
  const endpoint = await Endpoint__factory.connect(endpointAddr, signer);

  const depositAmount = toFixedPoint(10000, 6);

  const subaccountOwner = signer.address;
  const subaccountName = 'default';

  await (await quote.mint(signer.address, depositAmount)).wait();
  await (await quote.approve(context.contracts.endpoint, depositAmount)).wait();
  const depositTx = await depositCollateral({
    amount: depositAmount,
    endpoint,
    productId: 0,
    subaccountName,
  });
  await depositTx.wait();

  console.log('Done depositing collateral, placing stop orders');

  const ethProductId = 3;
  const ethOrderbookAddr = await clearinghouse.getOrderbook(ethProductId);
  const nonce = getTriggerOrderNonce();

  const shortStopOrder: EngineOrderParams & { nonce: string } = {
    amount: toX18(-0.1),
    expiration: getExpiration('fok'),
    nonce,
    price: 1000,
    subaccountName,
    subaccountOwner,
  };

  const shortStopDigest = getOrderDigest({
    chainId,
    order: shortStopOrder,
    verifyingAddr: ethOrderbookAddr,
  });

  const shortTriggerParams: TriggerPlaceOrderParams = {
    chainId,
    order: shortStopOrder,
    productId: ethProductId,
    spotLeverage: true,
    triggerCriteria: {
      type: 'oracle_price_above',
      triggerPrice: 10000,
    },
    verifyingAddr: ethOrderbookAddr,
    nonce,
    id: 1000,
  };
  const shortStopResult = await client.placeTriggerOrder(shortTriggerParams);
  prettyPrint('Short stop order result', shortStopResult);

  const btcPerpProductId = 2;
  const btcPerpOrderbookAddr = await clearinghouse.getOrderbook(
    btcPerpProductId,
  );

  const longStopOrder: EngineOrderParams = {
    amount: toX18(0.01),
    expiration: getExpiration('fok'),
    price: 50000,
    subaccountName,
    subaccountOwner,
  };

  const longStopParams: TriggerPlaceOrderParams = {
    chainId,
    order: longStopOrder,
    productId: btcPerpProductId,
    triggerCriteria: {
      type: 'oracle_price_below',
      triggerPrice: 10000,
    },
    verifyingAddr: btcPerpOrderbookAddr,
    nonce,
  };

  const longStopResult = await client.placeTriggerOrder(longStopParams);

  prettyPrint('Long stop order result', longStopResult);

  const pendingListOrdersResult = await client.listOrders({
    chainId,
    pending: true,
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
  });

  prettyPrint('Pending list orders result', pendingListOrdersResult);

  const pendingListOrdersForProductResult = await client.listOrders({
    chainId,
    pending: true,
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
    productId: ethProductId,
  });

  prettyPrint(
    'Pending list orders for product result',
    pendingListOrdersForProductResult,
  );

  // Cancel ETH order via digest
  const cancelViaDigestResult = await client.cancelTriggerOrders({
    digests: [shortStopDigest],
    productIds: [ethProductId],
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
    chainId,
  });

  prettyPrint('Cancel via digest result', cancelViaDigestResult);

  // Cancel orders via product
  const cancelViaProductResult = await client.cancelProductOrders({
    productIds: [ethProductId, btcPerpProductId],
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
    chainId,
  });

  prettyPrint('Cancel via product result', cancelViaProductResult);

  const nonPendingListOrdersResult = await client.listOrders({
    chainId,
    pending: false,
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
  });

  prettyPrint('Non-pending list orders result', nonPendingListOrdersResult);
}

runWithContext(fullSanity);
