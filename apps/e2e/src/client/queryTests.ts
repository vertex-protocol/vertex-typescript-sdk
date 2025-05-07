import { createVertexClient, VertexClient } from '@vertex-protocol/client';
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';

async function queryTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;

  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const walletClientAddress = walletClient.account.address;

  prettyPrint('Engine time', await vertexClient.context.engineClient.getTime());
  prettyPrint(
    'Symbols',
    await vertexClient.context.engineClient.getSymbols({}),
  );

  // Fetches state from offchain sequencer
  prettyPrint(
    'Engine All Markets',
    await vertexClient.market.getAllEngineMarkets(),
  );
  prettyPrint(
    'Edge all markets',
    await vertexClient.market.getAllEngineMarkets(),
  );

  // Fetches state from Arbitrum
  prettyPrint(
    'On-Chain all markets',
    await vertexClient.market.getAllMarkets(),
  );

  prettyPrint(
    'Latest market prices',
    await vertexClient.market.getLatestMarketPrices({ productIds: [1, 2, 3] }),
  );
  prettyPrint(
    'Market liquidity',
    await vertexClient.market.getMarketLiquidity({
      productId: 3,
      // Per side of the book
      depth: 5,
    }),
  );

  // Subaccount state from engine
  prettyPrint(
    'Subaccount state from engine',
    await vertexClient.subaccount.getEngineSubaccountSummary({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );
  // Subaccount state from Arbitrum
  prettyPrint(
    'Subaccount state on-chain',
    await vertexClient.subaccount.getSubaccountSummary({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );

  prettyPrint(
    'Isolated positions',
    await vertexClient.subaccount.getIsolatedPositions({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );

  prettyPrint(
    'Subaccount fee rates',
    await vertexClient.subaccount.getSubaccountFeeRates({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );

  prettyPrint(
    'Subaccount linked signer with rate limit',
    await vertexClient.subaccount.getSubaccountLinkedSignerWithRateLimit({
      subaccount: {
        subaccountOwner: walletClientAddress,
        subaccountName: 'default',
      },
    }),
  );

  prettyPrint(
    'Referral code',
    await vertexClient.subaccount.getReferralCode({
      subaccount: {
        subaccountOwner: walletClientAddress,
        subaccountName: 'default',
      },
    }),
  );

  prettyPrint(
    'Open subaccount orders',
    await vertexClient.market.getOpenSubaccountOrders({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
      productId: 1,
    }),
  );

  prettyPrint(
    'Open subaccount multi-product orders',
    await vertexClient.market.getOpenSubaccountMultiProductOrders({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
      productIds: [1, 2, 3],
    }),
  );
}

console.log('[client]: Running query tests');
runWithContext(queryTests);
