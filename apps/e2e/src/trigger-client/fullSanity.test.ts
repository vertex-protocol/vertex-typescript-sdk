import {
  depositCollateral,
  getOrderDigest,
  getTriggerOrderNonce,
  VERTEX_ABIS,
  MOCK_ERC20_ABI,
} from '@vertex-protocol/contracts';
import {
  EngineClient,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';
import {
  TriggerClient,
  TriggerPlaceOrderParams,
} from '@vertex-protocol/trigger-client';
import { addDecimals, toBigInt } from '@vertex-protocol/utils';
import { getContract } from 'viem';
import { getExpiration } from '../utils/getExpiration';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { waitForTransaction } from '../utils/waitForTransaction';
import test from 'node:test';
import { debugPrint } from '../utils/debugPrint';

async function fullSanity(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;
  const chainId = walletClient.chain.id;

  const engineClient = new EngineClient({
    url: context.endpoints.engine,
    walletClient,
  });

  const client = new TriggerClient({
    url: context.endpoints.trigger,
    walletClient,
  });

  const clearinghouse = getContract({
    abi: VERTEX_ABIS.clearinghouse,
    address: context.contracts.clearinghouse,
    client: walletClient,
  });
  const quote = getContract({
    abi: MOCK_ERC20_ABI,
    address: await clearinghouse.read.getQuote(),
    client: walletClient,
  });
  const endpointAddr = context.contracts.endpoint;
  const endpoint = getContract({
    abi: VERTEX_ABIS.endpoint,
    address: endpointAddr,
    client: walletClient,
  });

  const depositAmount = toBigInt(addDecimals(10000, 6));

  const subaccountOwner = walletClient.account.address;
  const subaccountName = 'default';

  await waitForTransaction(
    quote.write.mint([walletClient.account.address, depositAmount]),
    publicClient,
  );
  await waitForTransaction(
    quote.write.approve([context.contracts.endpoint, depositAmount]),
    publicClient,
  );
  await waitForTransaction(
    depositCollateral({
      amount: depositAmount,
      endpoint,
      productId: 0,
      subaccountName,
    }),
    publicClient,
  );

  console.log('Done depositing collateral, placing stop orders');

  const ethProductId = 3;
  const ethOrderbookAddr = await engineClient.getOrderbookAddress(ethProductId);
  const nonce = getTriggerOrderNonce();

  const shortStopOrder: EngineOrderParams & { nonce: string } = {
    amount: addDecimals(-0.1),
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
  debugPrint('Short stop order result', shortStopResult.data);

  const btcPerpProductId = 2;
  const btcPerpOrderbookAddr =
    await engineClient.getOrderbookAddress(btcPerpProductId);

  const longStopNonce = getTriggerOrderNonce();

  const longStopOrder: EngineOrderParams & { nonce: string } = {
    nonce: longStopNonce,
    amount: addDecimals(0.01),
    expiration: getExpiration('fok'),
    price: 60000,
    subaccountName,
    subaccountOwner,
  };

  const longStopDigest = getOrderDigest({
    chainId,
    order: longStopOrder,
    verifyingAddr: ethOrderbookAddr,
  });

  const longStopParams: TriggerPlaceOrderParams = {
    chainId,
    order: longStopOrder,
    productId: btcPerpProductId,
    triggerCriteria: {
      type: 'oracle_price_below',
      triggerPrice: 60000,
    },
    verifyingAddr: btcPerpOrderbookAddr,
    nonce: longStopNonce,
  };

  const longStopResult = await client.placeTriggerOrder(longStopParams);

  debugPrint('Long stop order result', longStopResult);

  const pendingListOrdersResult = await client.listOrders({
    chainId,
    pending: true,
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
  });

  debugPrint('Pending list orders result', pendingListOrdersResult);

  const pendingListOrdersForProductResult = await client.listOrders({
    chainId,
    pending: true,
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
    productId: ethProductId,
  });

  debugPrint(
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

  debugPrint('Cancel via digest result', cancelViaDigestResult);

  // Cancel orders via product
  const cancelViaProductResult = await client.cancelProductOrders({
    productIds: [ethProductId, btcPerpProductId],
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
    chainId,
  });

  debugPrint('Cancel via product result', cancelViaProductResult);

  const nonPendingListOrdersResult = await client.listOrders({
    chainId,
    pending: false,
    subaccountName,
    subaccountOwner,
    verifyingAddr: endpointAddr,
  });

  debugPrint('Non-pending list orders result', nonPendingListOrdersResult);

  const ordersByDigest = await client.listOrders({
    chainId,
    verifyingAddr: endpointAddr,
    subaccountName,
    subaccountOwner,
    pending: false,
    digests: [shortStopDigest, longStopDigest],
  });

  debugPrint('List orders by digest result', ordersByDigest);
}

void test('[trigger-client]: Running full sanity test', () =>
  runWithContext(fullSanity));
