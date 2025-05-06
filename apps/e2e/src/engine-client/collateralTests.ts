import { MOCK_ERC20_ABI } from '@vertex-protocol/contracts/src/common/abis/MockERC20';
import { EngineClient } from '@vertex-protocol/engine-client';
import { depositCollateral, VERTEX_ABIS } from '@vertex-protocol/contracts';
import { addDecimals } from '@vertex-protocol/utils';
import { getContract } from 'viem';
import { waitForTransaction } from '../utils/waitForTransaction';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';
import { runWithContext } from '../utils/runWithContext';

export async function collateralTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;
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
  const quote = getContract({
    abi: MOCK_ERC20_ABI,
    address: await clearinghouse.read.getQuote(),
    client: walletClient,
  });
  const endpointAddr = await clearinghouse.read.getEndpoint();
  const endpoint = getContract({
    abi: VERTEX_ABIS.endpoint,
    address: endpointAddr,
    client: walletClient,
  });

  const amount = BigInt(addDecimals(10000, 6));

  // Mint and approve quote
  await waitForTransaction(
    quote.write.mint([walletClientAddress, amount]),
    publicClient,
  );
  await waitForTransaction(
    quote.write.approve([endpointAddr, amount]),
    publicClient,
  );

  // Deposit collateral
  await waitForTransaction(
    depositCollateral({
      amount: addDecimals(10000, 6),
      endpoint,
      productId: 0,
      subaccountName: 'default',
    }),
    publicClient,
  );
  console.log('Done depositing collateral');

  // Wait for slow mode delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

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
    productId: 0,
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

  // Delay for rate limit
  await new Promise((resolve) => setTimeout(resolve, 5000));
}

console.log('Running collateral tests');
runWithContext(collateralTests);
