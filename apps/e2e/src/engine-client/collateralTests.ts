import { EngineClient } from '@vertex-protocol/engine-client';
import { QUOTE_PRODUCT_ID, VERTEX_ABIS } from '@vertex-protocol/contracts';
import { addDecimals } from '@vertex-protocol/utils';
import { getContract } from 'viem';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';
import { runWithContext } from '../utils/runWithContext';

async function collateralTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const walletClientAddress = walletClient.account.address;

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

  // Transfer quote
  const transferQuoteResult = await client.transferQuote({
    chainId: walletClient.chain.id,
    recipientSubaccountName: 'transfer1',
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    amount: addDecimals(50),
    verifyingAddr: endpointAddr,
  });
  prettyPrint('Done transferring quote', transferQuoteResult);

  // Withdraw collateral
  const withdrawResult = await client.withdrawCollateral({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    productId: QUOTE_PRODUCT_ID,
    amount: addDecimals(4999, 6),
    verifyingAddr: endpointAddr,
    chainId: walletClient.chain.id,
  });
  prettyPrint('Done withdrawing collateral, result', withdrawResult);

  const subaccountInfoAtEnd = await client.getSubaccountSummary({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });
  prettyPrint('Subaccount info after withdraw collateral', subaccountInfoAtEnd);
}

console.log('[engine-client]: Running collateral tests');
runWithContext(collateralTests);
