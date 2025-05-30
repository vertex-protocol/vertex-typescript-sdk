import {
  createVertexClient,
  QUOTE_PRODUCT_ID,
  VertexClient,
} from '@vertex-protocol/client';
import { addDecimals } from '@vertex-protocol/utils';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { waitForTransaction } from '../utils/waitForTransaction';

async function accountSetup(context: RunContext) {
  const walletClient = context.getWalletClient();
  const publicClient = context.publicClient;

  const vertexClient: VertexClient = createVertexClient(context.env.chainEnv, {
    walletClient,
    publicClient,
  });

  const quoteDepositAmount = addDecimals(1000, 6);

  console.log('Minting tokens');
  await waitForTransaction(
    vertexClient.spot._mintMockERC20({
      amount: quoteDepositAmount,
      productId: QUOTE_PRODUCT_ID,
    }),
    publicClient,
  );

  console.log('Approving allowance');
  await waitForTransaction(
    vertexClient.spot.approveAllowance({
      amount: quoteDepositAmount,
      productId: QUOTE_PRODUCT_ID,
    }),
    publicClient,
  );

  console.log('Depositing tokens');
  await waitForTransaction(
    vertexClient.spot.deposit({
      subaccountName: 'default',
      productId: QUOTE_PRODUCT_ID,
      amount: quoteDepositAmount,
    }),
    publicClient,
  );
}

console.log('[utils]: Running account setup');
void runWithContext(accountSetup);
