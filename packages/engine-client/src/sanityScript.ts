import { ethers, Wallet } from 'ethers';
import {
  DepositCollateralParams,
  IClearinghouse__factory,
  OrderParams,
} from '@vertex-protocol/contracts';
import { MaxUint64 } from '@vertex-protocol/utils';
import { EngineClient } from './EngineClient';

function getNonce() {
  return Date.now().toFixed(0) + (Math.random() * 1000).toFixed(0);
}

async function main() {
  // Hardhat deployers
  const signer = new Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    new ethers.providers.JsonRpcProvider(),
  );

  const client = new EngineClient({
    url: 'http://localhost:80/api',
    signer,
  });

  const clearinghouseAddr = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
  const sequencerAddr = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';

  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddr,
    signer,
  );
  const id = await clearinghouse.getSubaccountId(
    '0xEAe27Ae6412147Ed6d5692Fd91709DaD6dbfc342',
    'default',
  );
  console.log('ID', id.toNumber());

  // Deposit collateral
  const depositParams: DepositCollateralParams = {
    sender: signer.address,
    subaccountName: 'default',
    productId: 0,
    amount: 100,
    nonce: getNonce(),
  };
  const depositResult = await client.depositCollateral({
    ...depositParams,
    endpointAddr: sequencerAddr,
  });
  console.log('Done depositing collateral, result', depositResult);

  const subaccountId = await clearinghouse.getSubaccountId(
    signer.address,
    'default',
  );
  console.log('Subaccount ID', subaccountId.toString());

  console.log('Querying subaccount');

  const subaccountInfo = await client.getSubaccountSummary({
    subaccountId,
  });
  console.log('Subaccount info', JSON.stringify(subaccountInfo, null, 2));

  const products = await client.getAllMarkets();
  console.log('All products', JSON.stringify(products, null, 2));

  console.log('Placing order');
  const productId = 1;
  const orderbookAddr = await clearinghouse.getOrderbook(productId);
  const order: OrderParams = {
    amount: 1,
    expiration: MaxUint64,
    nonce: getNonce(),
    price: 10,
    subaccountId,
  };
  const placeResult = await client.placeOrder({
    orderbookAddr,
    productId,
    order,
  });
  console.log('Done placing order', placeResult);

  const subaccountOrders = await client.getSubaccountOrders({
    productId,
    subaccountId,
  });
  console.log('Subaccount orders', JSON.stringify(subaccountOrders));
  const marketLiquidity = await client.getMarketLiquidity({
    depth: 10,
    productId,
  });
  console.log('Market liquidity', JSON.stringify(marketLiquidity, null, 2));
  const marketPrice = await client.getMarketPrice({
    productId,
  });
  console.log('Market price', JSON.stringify(marketPrice, null, 2));
  const queriedOrder = await client.getOrder({
    digest: placeResult.digest,
    productId,
  });
  console.log('Queried order', JSON.stringify(queriedOrder, null, 2));

  console.log('Cancelling order');
  const cancelResult = await client.cancelOrder({
    orderbookAddr,
    productId,
    order,
  });
  console.log('Done cancelling order', cancelResult);

  const subaccountOrdersAfterCancel = await client.getSubaccountOrders({
    productId,
    subaccountId,
  });
  console.log(
    'Subaccount orders after cancellation',
    JSON.stringify(subaccountOrdersAfterCancel),
  );
}

main();
