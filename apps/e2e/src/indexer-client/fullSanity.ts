import { Subaccount } from '@vertex-protocol/contracts';
import {
  CandlestickPeriod,
  IndexerClient,
} from '@vertex-protocol/indexer-client';
import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';

async function fullSanity(context: RunContext) {
  const client = new IndexerClient({
    url: context.endpoints.indexer,
  });

  const subaccount: Subaccount = {
    subaccountName: 'default',
    subaccountOwner: context.getWallet().address,
  };

  const summary = await client.getMultiSubaccountSnapshots({
    subaccounts: [subaccount],
    timestamps: [nowInSeconds(), nowInSeconds() - 60 * 60 * 24],
  });

  prettyPrint('Summary', summary);

  const fundingRate = await client.getFundingRate({
    productId: 2,
  });

  prettyPrint('Funding rate', fundingRate.fundingRate.toString());

  const fundingRates = await client.getMultiProductFundingRates({
    productIds: [2, 4],
  });

  prettyPrint('Multiple products funding rate', fundingRates);

  const price = await client.getPerpPrices({
    productId: 2,
  });

  prettyPrint('Perp prices', price);

  const perpPrices = await client.getMultiProductPerpPrices({
    productIds: [2, 4, 6],
  });

  prettyPrint('Multiple products perp prices', perpPrices);

  const oraclePrices = await client.getOraclePrices({
    productIds: [1, 2, 3, 4],
  });

  prettyPrint('Oracle Prices', oraclePrices);

  const usdcPrice = await client.getQuotePrice();

  prettyPrint('USDC Price', usdcPrice);

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

  if (
    context.env.chainEnv === 'blastTestnet' ||
    context.env.chainEnv === 'blast'
  ) {
    const blastPoints = await client.getBlastPoints({
      address: subaccount.subaccountOwner,
    });
    const blitzPoints = await client.getBlitzPoints({
      address: subaccount.subaccountOwner,
    });

    const blitzPointsLeaderboard = await client.getBlitzPointsLeaderboard({
      startCursor: undefined,
      epoch: 1,
      limit: 5,
    });

    prettyPrint('Blitz & Blast Points', {
      blastPoints,
      blitzPoints,
    });

    prettyPrint('Blitz Points Leaderboard', blitzPointsLeaderboard);
  }

  prettyPrint('Referral code', referralCode);

  const productSnapshots = await client.getProductSnapshots({
    limit: 2,
    maxTimestampInclusive: nowInSeconds(),
    productId: 2,
  });

  prettyPrint('Product snapshots', productSnapshots);

  const marketSnapshots = await client.getMarketSnapshots({
    granularity: TimeInSeconds.HOUR,
    limit: 1,
    productIds: [2, 3, 4],
  });

  prettyPrint('Market snapshots', marketSnapshots);

  const multiProductSnapshots = await client.getMultiProductSnapshots({
    productIds: [2, 3],
  });

  prettyPrint(
    'Multiple products snapshots',
    Object.values(multiProductSnapshots).pop(),
  );

  const now = nowInSeconds();
  const multiTimestampProductSnapshots = await client.getMultiProductSnapshots({
    productIds: [1, 2, 3],
    maxTimestampInclusive: [
      now,
      now - TimeInSeconds.HOUR,
      now - TimeInSeconds.DAY,
    ],
  });

  prettyPrint(
    'Multi timestamp and multi product snapshots',
    multiTimestampProductSnapshots,
  );

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

  const leaderboard = await client.getLeaderboard({
    limit: 5,
    startCursor: undefined,
    contestId: 8,
    rankType: 'pnl',
  });

  prettyPrint('Leaderboard', leaderboard);

  const leaderboardParticipant = await client.getLeaderboardParticipant({
    subaccount: {
      subaccountName: subaccount.subaccountName,
      subaccountOwner: subaccount.subaccountOwner,
    },
    contestIds: [5, 6, 7],
  });

  prettyPrint('Leaderboard Participant', leaderboardParticipant);

  const leaderboardContests = await client.getLeaderboardContests({
    contestIds: [1],
  });

  prettyPrint('Leaderboard Contests', leaderboardContests);

  const leaderboardFirstPage = await client.getPaginatedLeaderboard({
    rankType: 'roi',
    startCursor: undefined,
    contestId: 1,
    limit: 5,
  });

  prettyPrint('Leaderboard First Page', leaderboardFirstPage);

  if (leaderboardFirstPage.meta.hasMore) {
    const leaderboardSecondPage = await client.getPaginatedLeaderboard({
      rankType: 'roi',
      startCursor: leaderboardFirstPage.meta.nextCursor,
      contestId: 1,
      limit: 5,
    });

    prettyPrint('Leaderboard Second Page', leaderboardSecondPage);
  }

  const vrtxTotalSupply = await client.getVrtxTokenInfo({
    tokenInfoType: 'total_supply',
  });

  prettyPrint('VRTX Total Supply', vrtxTotalSupply);

  const vrtxCirculatingSupply = await client.getVrtxTokenInfo({
    tokenInfoType: 'circulating_supply',
  });

  prettyPrint('VRTX Circulating Supply', vrtxCirculatingSupply);

  const latestWithdrawal = await client.getEvents({
    eventTypes: ['withdraw_collateral'],
    limit: {
      type: 'txs',
      value: 1,
    },
  });

  const fastWithdrawalSignature = await client.getFastWithdrawalSignature({
    idx: latestWithdrawal[0].submissionIndex,
  });

  prettyPrint('Fast Withdrawal Signature', fastWithdrawalSignature);
}

runWithContext(fullSanity);
