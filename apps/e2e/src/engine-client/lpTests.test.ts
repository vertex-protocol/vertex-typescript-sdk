import { EngineClient } from '@vertex-protocol/engine-client';
import { VERTEX_ABIS } from '@vertex-protocol/contracts';
import { addDecimals, BigDecimals } from '@vertex-protocol/utils';
import { getContract } from 'viem';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';
import { runWithContext } from '../utils/runWithContext';
import test from 'node:test';

async function lpTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const walletClientAddress = walletClient.account.address;
  const chainId = walletClient.chain.id;

  const client = new EngineClient({
    url: context.endpoints.engine,
    walletClient,
  });

  const clearinghouse = getContract({
    abi: VERTEX_ABIS.clearinghouse,
    address: context.contracts.clearinghouse,
    client: walletClient,
  });

  const endpointAddr = await clearinghouse.read.getEndpoint();

  const spotLpProductId = 3;

  const allMarkets = await client.getAllMarkets();

  const spotLpMarket = allMarkets.find(
    (market) => market.productId === spotLpProductId,
  );

  const oraclePrice = spotLpMarket?.product.oraclePrice ?? BigDecimals.ZERO;

  const mintSpotLpResult = await client.mintLp({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    productId: spotLpProductId,
    amountBase: addDecimals(1),
    quoteAmountLow: addDecimals(oraclePrice.times(0.5)),
    quoteAmountHigh: addDecimals(oraclePrice.times(1.5)),
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done minting spot lp', mintSpotLpResult);

  const subaccountInfoAfterMintingLp = await client.getSubaccountSummary({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });
  prettyPrint('Subaccount info after LP mint', subaccountInfoAfterMintingLp);

  const burnSpotLpResult = await client.burnLp({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    productId: spotLpProductId,
    amount: addDecimals(1),
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done burning spot lp', burnSpotLpResult);
}

void test('[engine-client]: Running LP tests', () => runWithContext(lpTests));
