import { createVertexClient, VertexClient } from '@vertex-protocol/client';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import test from 'node:test';
import { debugPrint } from '../utils/debugPrint';

async function queryTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;

  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const walletClientAddress = walletClient.account.address;

  debugPrint('Engine time', await vertexClient.context.engineClient.getTime());
  debugPrint('Symbols', await vertexClient.context.engineClient.getSymbols({}));

  // Fetches state from offchain sequencer
  debugPrint(
    'Engine All Markets',
    await vertexClient.market.getAllEngineMarkets(),
  );
  debugPrint(
    'Edge all markets',
    await vertexClient.market.getAllEngineMarkets(),
  );

  // Fetches state from Arbitrum
  debugPrint('On-Chain all markets', await vertexClient.market.getAllMarkets());

  debugPrint(
    'Latest market prices',
    await vertexClient.market.getLatestMarketPrices({
      productIds: [1, 2, 3],
    }),
  );
  debugPrint(
    'Market liquidity',
    await vertexClient.market.getMarketLiquidity({
      productId: 3,
      // Per side of the book
      depth: 5,
    }),
  );

  // Subaccount state from engine
  debugPrint(
    'Subaccount state from engine',
    await vertexClient.subaccount.getEngineSubaccountSummary({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );
  // Subaccount state from Arbitrum
  debugPrint(
    'Subaccount state on-chain',
    await vertexClient.subaccount.getSubaccountSummary({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );

  debugPrint(
    'Isolated positions',
    await vertexClient.subaccount.getIsolatedPositions({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );

  debugPrint(
    'Subaccount fee rates',
    await vertexClient.subaccount.getSubaccountFeeRates({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
    }),
  );

  debugPrint(
    'Subaccount linked signer with rate limit',
    await vertexClient.subaccount.getSubaccountLinkedSignerWithRateLimit({
      subaccount: {
        subaccountOwner: walletClientAddress,
        subaccountName: 'default',
      },
    }),
  );

  debugPrint(
    'Referral code',
    await vertexClient.subaccount.getReferralCode({
      subaccount: {
        subaccountOwner: walletClientAddress,
        subaccountName: 'default',
      },
    }),
  );

  debugPrint(
    'Open subaccount orders',
    await vertexClient.market.getOpenSubaccountOrders({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
      productId: 1,
    }),
  );

  debugPrint(
    'Open subaccount multi-product orders',
    await vertexClient.market.getOpenSubaccountMultiProductOrders({
      subaccountOwner: walletClientAddress,
      subaccountName: 'default',
      productIds: [1, 2, 3],
    }),
  );
}

void test('[client]: Running query tests', () => runWithContext(queryTests));
