import { EngineClient } from '@vertex-protocol/engine-client';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';

export async function queryTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const walletClientAddress = walletClient.account.address;

  const client = new EngineClient({
    url: context.endpoints.engine,
    walletClient,
  });

  const subaccountInfo = await client.getSubaccountSummary({
    subaccountOwner: walletClientAddress,
    subaccountName: 'default',
  });
  prettyPrint('Subaccount info', subaccountInfo);

  const symbols = await client.getSymbols({});
  prettyPrint('Symbols', symbols);

  const products = await client.getAllMarkets();
  prettyPrint('All products', products);

  const healthGroups = await client.getHealthGroups();
  prettyPrint('Health groups', healthGroups);

  const insurance = await client.getInsurance();
  prettyPrint('Insurance', insurance);

  const minDepositRates = await client.getMinDepositRates();
  prettyPrint('Min deposit rates', minDepositRates);
}
