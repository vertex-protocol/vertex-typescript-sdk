import { createVertexClient, VertexClient } from '@vertex-protocol/client';
import { getVertexEIP712Values } from '@vertex-protocol/contracts';
import { addDecimals, toBigInt } from '@vertex-protocol/utils';
import { encodeAbiParameters, encodePacked, parseAbiParameters } from 'viem';
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { waitForTransaction } from '../utils/waitForTransaction';

async function collateralTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;

  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const walletClientAddress = walletClient.account.address;

  console.log('Minting tokens');
  await waitForTransaction(
    vertexClient.spot._mintMockERC20({
      // 100 tokens
      amount: addDecimals(100, 6),
      productId: 0,
    }),
    publicClient,
  );

  console.log('Approving allowance');
  await waitForTransaction(
    vertexClient.spot.approveAllowance({
      amount: addDecimals(100, 6),
      productId: 0,
    }),
    publicClient,
  );

  /*
  Deposit 50 via regular flow, and 50 with included referral code
   */

  console.log('Depositing tokens');
  await waitForTransaction(
    vertexClient.spot.deposit({
      subaccountName: 'default',
      productId: 0,
      amount: addDecimals(50, 6),
    }),
    publicClient,
  );

  console.log('Depositing tokens with referral code');
  await waitForTransaction(
    vertexClient.spot.deposit({
      subaccountName: 'default',
      productId: 0,
      amount: addDecimals(50, 6),
      referralCode: 'Blk23MeZU3',
    }),
    publicClient,
  );

  /*
  Transfer collateral
   */
  const transferResult1 = await vertexClient.spot.transferQuote({
    amount: addDecimals(10),
    subaccountName: 'default',
    recipientSubaccountName: 'default2',
  });
  prettyPrint('Transfer result #1', transferResult1);

  const transferResult2 = await vertexClient.spot.transferQuote({
    amount: addDecimals(10),
    subaccountName: 'default2',
    recipientSubaccountName: 'default',
  });
  prettyPrint('Transfer result #2', transferResult2);

  /*
  Withdraw 50 via regular flow, and 50 via slow-mode
   */
  console.log('Withdrawing tokens');
  const withdrawalResult = await vertexClient.spot.withdraw({
    subaccountName: 'default',
    productId: 0,
    amount: addDecimals(50, 6),
  });
  prettyPrint('Withdrawal result', withdrawalResult);

  console.log('Slow mode withdrawal');
  // 1. approve 1 USDC for submitting slow-mode tx
  await waitForTransaction(
    vertexClient.spot.approveAllowance({
      amount: addDecimals(1, 6),
      productId: 0,
    }),
    publicClient,
  );
  // 2. generate withdraw collateral tx
  const tx = getVertexEIP712Values('withdraw_collateral', {
    amount: addDecimals(50, 6),
    nonce: await vertexClient.context.engineClient.getTxNonce(),
    productId: 0,
    subaccountName: 'default',
    subaccountOwner: walletClientAddress,
  });
  const encodedTx = encodeAbiParameters(
    parseAbiParameters('bytes32, uint32, uint128, uint64'),
    [tx.sender, tx.productId, toBigInt(tx.amount), toBigInt(tx.nonce)],
  );
  const encodedSlowModeTx = encodePacked(
    ['uint8', 'bytes'],
    [
      // Withdraw collateral enum value
      2,
      encodedTx,
    ],
  );

  console.log('Submitting slow mode withdrawal');
  // 3. submit via slow-mode
  await waitForTransaction(
    vertexClient.context.contracts.endpoint.write.submitSlowModeTransaction([
      encodedSlowModeTx,
    ]),
    publicClient,
  );
}

void runWithContext(collateralTests);
