import { addDecimals } from '@vertex-protocol/utils';
import { RunContext } from '../utils/types';
import {
  VERTEX_ABIS,
  depositCollateral,
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
  MOCK_ERC20_ABI,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import { getContract } from 'viem';
import { waitForTransaction } from '../utils/waitForTransaction';
import { runWithContext } from '../utils/runWithContext';

async function accountSetup(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;
  const walletClientAddress = walletClient.account.address;

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
}

// Run the account setup
console.log('[engine-client]: Running account setup');
runWithContext(accountSetup);
