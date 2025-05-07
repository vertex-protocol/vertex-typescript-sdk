import { EngineClient } from '@vertex-protocol/engine-client';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';
import { runWithContext } from '../utils/runWithContext';
import {
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
} from '@vertex-protocol/contracts';

export async function queryTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const walletClientAddress = walletClient.account.address;

  const client = new EngineClient({
    url: context.endpoints.engine,
    walletClient,
  });

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

console.log('[engine-client]: Running query tests');
runWithContext(queryTests);
