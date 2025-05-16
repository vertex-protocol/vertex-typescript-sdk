import { EngineClient } from '@vertex-protocol/engine-client';
import {
  depositCollateral,
  MOCK_ERC20_ABI,
  QUOTE_PRODUCT_ID,
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
  VERTEX_ABIS,
} from '@vertex-protocol/contracts';
import { addDecimals } from '@vertex-protocol/utils';
import { getContract } from 'viem';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';
import { runWithContext } from '../utils/runWithContext';
import { waitForTransaction } from '../utils/waitForTransaction';

export async function collateralTests(context: RunContext) {
  console.log('[engine-client]: Running collateral tests');

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

  // Log the subaccount information
  console.log(`Subaccount (in): ${walletClientAddress}; default`);
  const subaccountBytes32 = subaccountToBytes32({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });
  const subaccountHex = subaccountToHex({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });
  console.log(`subaccountBytes32: ${String(subaccountBytes32)}`);
  console.log(`subaccountHex: ${subaccountHex}`);
  const subaccountFrom32BytesOut = subaccountFromBytes32(subaccountBytes32);
  const subaccountFromHexOut = subaccountFromHex(subaccountHex);
  console.log(
    `subaccountFrom32Bytes (out): ${subaccountFrom32BytesOut.subaccountOwner}; ${subaccountFrom32BytesOut.subaccountName}`,
  );
  console.log(
    `subaccountFromHex (out): ${subaccountFromHexOut.subaccountOwner}; ${subaccountFromHexOut.subaccountName}`,
  );

  // Begin account setup
  const depositAmount = BigInt(addDecimals(10000, 6));

  // Mint and approve quote
  console.log('Minting tokens');
  await waitForTransaction(
    quote.write.mint([walletClientAddress, depositAmount]),
    publicClient,
  );

  // Approve allowance
  console.log('Approving allowance');
  await waitForTransaction(
    quote.write.approve([endpointAddr, depositAmount]),
    publicClient,
  );

  // Deposit collateral
  console.log('Depositing tokens');
  await waitForTransaction(
    depositCollateral({
      amount: depositAmount,
      endpoint,
      productId: QUOTE_PRODUCT_ID,
      subaccountName: 'default',
    }),
    publicClient,
  );

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

// Run only if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  void runWithContext(collateralTests);
}
