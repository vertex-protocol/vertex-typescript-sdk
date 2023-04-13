import { Subaccount } from '@vertex-protocol/contracts';
import { nowInSeconds, toPrintableObject } from '@vertex-protocol/utils';

import { INDEXER_CLIENT_ENDPOINTS } from './endpoints';
import { IndexerClient } from './IndexerClient';
import { CandlestickPeriod } from './types';

async function main() {
  const client = new IndexerClient({
    url: INDEXER_CLIENT_ENDPOINTS.testnet,
  });

  const subaccount: Subaccount = {
    subaccountName: 'default',
    subaccountOwner: '0xEAe27Ae6412147Ed6d5692Fd91709DaD6dbfc342',
  };

  const summary = await client.getSubaccountSummary({
    subaccount,
    timestamp: nowInSeconds(),
  });

  prettyPrint('Summary', summary);

  const fundingRate = await client.getFundingRate({
    productId: 2,
  });

  prettyPrint('Funding rate', fundingRate.fundingRate.toString());

  const price = await client.getPerpPrices({
    productId: 2,
  });

  prettyPrint('Perp prices', toPrintableObject(price));

  const rewards = await client.getSubaccountRewards({
    subaccount,
  });

  prettyPrint('Rewards', toPrintableObject(rewards));

  const productSnapshots = await client.getProductSnapshots({
    limit: 2,
    maxTimestampInclusive: nowInSeconds(),
    productId: 1,
  });

  prettyPrint('Product snapshots', productSnapshots);

  const candlesticks = await client.getCandlesticks({
    limit: 2,
    maxTimeInclusive: nowInSeconds(),
    period: CandlestickPeriod.DAY,
    productId: 3,
  });

  prettyPrint('Candlesticks', candlesticks);

  const orders = await client.getPaginatedSubaccountOrders({
    limit: 1,
    startCursor: undefined,
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
  });

  prettyPrint('Paginated Orders', orders);

  const events = await client.getEvents({
    eventTypes: ['deposit_collateral', 'withdraw_collateral'],
    limit: {
      type: 'txs',
      value: 1,
    },
    maxTimestampInclusive: nowInSeconds(),
    subaccount,
  });

  prettyPrint('Raw Events', events);

  const matchEvents = await client.getPaginatedSubaccountMatchEvents({
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
    productIds: [1, 2, 3],
    limit: 1,
  });

  prettyPrint('Match events', matchEvents);

  const settlementEvents = await client.getPaginatedSubaccountSettlementEvents({
    limit: 1,
    startCursor: undefined,
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
  });

  prettyPrint('Paginated settlement events', settlementEvents);

  const allCollateralEvents =
    await client.getPaginatedSubaccountCollateralEvents({
      limit: 2,
      startCursor: '507204',
      subaccountName: subaccount.subaccountName,
      subaccountOwner: subaccount.subaccountOwner,
    });

  prettyPrint('Paginated all collateral events', allCollateralEvents);

  const depositEvents = await client.getPaginatedSubaccountCollateralEvents({
    limit: 1,
    startCursor: '507204',
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
    eventTypes: ['deposit_collateral'],
  });

  prettyPrint('Paginated deposit events', depositEvents);

  const withdrawEvents = await client.getPaginatedSubaccountCollateralEvents({
    limit: 1,
    startCursor: '507204',
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
    eventTypes: ['withdraw_collateral'],
  });

  prettyPrint('Paginated withdrawal events', withdrawEvents);

  const lpEvents = await client.getPaginatedSubaccountLpEvents({
    limit: 1,
    startCursor: undefined,
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
  });

  prettyPrint('Paginated LP events', lpEvents);
}

main().catch((e) => console.log(e));

/**
 * Util for pretty printing JSON
 */
function prettyPrint(label: string, obj: unknown) {
  console.log(label);
  console.log(JSON.stringify(toPrintableObject(obj), null, 2));
}
