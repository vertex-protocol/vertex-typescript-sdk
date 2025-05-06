import { EngineClient } from '@vertex-protocol/engine-client';
import { prettyPrint } from '../utils/prettyPrint';
import { VERTEX_ABIS, VLP_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  addDecimals,
  removeDecimals,
  BigDecimals,
} from '@vertex-protocol/utils';
import { RunContext } from '../utils/types';
import { getContract } from 'viem';

export async function vlpTests(context: RunContext) {
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

  const maxMintVlpAmount = await client.getMaxMintVlpAmount({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    spotLeverage: true,
  });
  prettyPrint('Max mint VLP amount', maxMintVlpAmount);

  const mintVlpResult = await client.mintVlp({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    quoteAmount: addDecimals(10),
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done minting VLP', mintVlpResult);

  const subaccountInfoAfterVlpMint = await client.getSubaccountSummary({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });
  const vlpBalanceAmount =
    subaccountInfoAfterVlpMint.balances.find(
      (bal) => bal.productId === VLP_PRODUCT_ID,
    )?.amount ?? BigDecimals.ZERO;
  prettyPrint('VLP Balance', removeDecimals(vlpBalanceAmount));

  const burnVlpResult = await client.burnVlp({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
    vlpAmount: vlpBalanceAmount,
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done burning VLP', burnVlpResult);
}
