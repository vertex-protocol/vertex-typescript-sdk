import { EngineClient } from '@vertex-protocol/engine-client';
import { VERTEX_ABIS } from '@vertex-protocol/contracts';
import { addDecimals } from '@vertex-protocol/utils';
import { getContract } from 'viem';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';
import { runWithContext } from '../utils/runWithContext';

export async function lpTests(context: RunContext) {
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

  const mintSpotLpResult = await client.mintLp({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    productId: 3,
    amountBase: addDecimals(1),
    quoteAmountLow: addDecimals(1000),
    quoteAmountHigh: addDecimals(6000),
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
    productId: 3,
    amount: addDecimals(1),
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done burning spot lp', burnSpotLpResult);
}

console.log('[engine-client]: Running LP tests');
runWithContext(lpTests);
