import { EngineServerClient } from './EngineServerClient';
import { Wallet } from 'ethers';
import {
  DepositCollateralParams,
  getSignedTransactionRequest,
  IClearinghouse__factory,
  MockERC20__factory,
} from '@vertex-protocol/contracts';

async function main() {
  const client = new EngineServerClient({ url: '' });
  await client.setup();

  // Hardhat deployers
  const signer = new Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  );
  const chainId = await signer.getChainId();

  const clearinghouseAddr = '';
  const sequencerAddr = '';

  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddr,
    signer,
  );

  // Mint some tokens
  const quote = await MockERC20__factory.connect(
    await clearinghouse.getQuote(),
    signer,
  );
  await quote.mint(signer.address, 100000);
  await quote.approve(clearinghouseAddr, 100000);
  console.log('Minted & approved');

  // Deposit collateral
  const depositParams: DepositCollateralParams = {
    sender: signer.address,
    subaccountName: 'default',
    productId: 0,
    amount: 100,
    nonce: Date.now().toFixed(0),
  };
  const resultKey = await client.depositCollateral({
    tx: depositParams,
    signature: await getSignedTransactionRequest({
      chainId,
      requestParams: depositParams,
      requestType: 'deposit_collateral',
      signer,
      verifyingContract: sequencerAddr,
    }),
  });
  console.log('Done depositing collateral, looking for result', resultKey);

  const result = await client.waitForExecuteResult(resultKey!);
  console.log('Deposit result', result);

  await client.teardown();
}

main();
