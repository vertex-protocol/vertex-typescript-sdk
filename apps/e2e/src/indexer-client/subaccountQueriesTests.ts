import { Subaccount } from '@vertex-protocol/contracts';
import { IndexerClient } from '@vertex-protocol/indexer-client';
import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';

export async function subaccountQueriesTests(context: RunContext) {
  const walletClient = context.getWalletClient();

  const client = new IndexerClient({
    url: context.endpoints.indexer,
    walletClient,
  });

  const subaccount: Subaccount = {
    subaccountName: 'default',
    subaccountOwner: walletClient.account.address,
  };

  const summary = await client.getMultiSubaccountSnapshots({
    subaccounts: [subaccount],
    timestamps: [nowInSeconds(), nowInSeconds() - 60 * 60 * 24],
  });

  prettyPrint('Summary', summary);

  const linkedSigner = await client.getLinkedSignerWithRateLimit({
    subaccount,
  });

  prettyPrint('Linked Signer', linkedSigner);

  const rewards = await client.getPaginatedRewards({
    address: subaccount.subaccountOwner,
    limit: 2,
    startCursor: '10',
  });

  prettyPrint('Paginated Rewards', rewards);

  const takerRewards = await client.getTakerRewards({
    address: subaccount.subaccountOwner,
    limit: 1,
  });

  prettyPrint('Taker Rewards', takerRewards);

  const referralCode = await client.getReferralCode({
    subaccount,
  });

  prettyPrint('Referral code', referralCode);

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

  const eventsAsc = await client.getEvents({
    eventTypes: ['match_orders'],
    limit: {
      type: 'events',
      value: 1,
    },
    desc: false,
    subaccount,
  });

  prettyPrint('Raw Events Asc', eventsAsc);

  const matchEvents = await client.getPaginatedSubaccountMatchEvents({
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
    productIds: [0, 2, 3, 4],
    limit: 10,
  });

  prettyPrint('Match events', matchEvents);

  const interestFundingPayments =
    await client.getPaginatedSubaccountInterestFundingPayments({
      subaccountName: subaccount.subaccountName,
      subaccountOwner: subaccount.subaccountOwner,
      productIds: [0, 2, 3, 4],
      limit: 10,
    });

  prettyPrint('Interest & funding payments', interestFundingPayments);

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
    maxTimestampInclusive: nowInSeconds() - TimeInSeconds.DAY,
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

  const vlpEvents = await client.getPaginatedSubaccountVlpEvents({
    limit: 1,
    startCursor: undefined,
    subaccountName: subaccount.subaccountName,
    subaccountOwner: subaccount.subaccountOwner,
  });

  prettyPrint('Paginated VLP events', vlpEvents);
}
