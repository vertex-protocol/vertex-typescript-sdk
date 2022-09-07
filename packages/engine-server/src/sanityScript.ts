import { EngineServerClient } from './EngineServerClient';
import { ethers, Wallet } from 'ethers';
import {
  DepositCollateralParams,
  getSignedTransactionRequest,
  IClearinghouse__factory,
  MockERC20__factory,
  OrderParams,
} from '@vertex-protocol/contracts';
import { MaxUint64 } from '@vertex-protocol/utils';

function getNonce() {
  return Date.now().toFixed(0) + (Math.random() * 1000).toFixed(0);
}

async function main() {
  const client = new EngineServerClient({ url: 'redis://0.0.0.0:6379' });
  await client.setup();

  // Hardhat deployers
  const signer = new Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    new ethers.providers.JsonRpcProvider(),
  );
  const chainId = await signer.getChainId();

  const clearinghouseAddr = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
  const sequencerAddr = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';

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
    nonce: getNonce(),
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
  console.log('Done depositing collateral, looking for result');
  const result = await client.waitForExecuteResult(resultKey!);
  console.log('Deposit result', result);

  const subaccountId = await clearinghouse.getSubaccountId(
    signer.address,
    'default',
  );
  console.log('Subaccount ID', subaccountId.toString());

  console.log('Querying products and subaccount');

  const products = await client.query('all_products', {});
  console.log('All products', JSON.stringify(products, null, 2));

  const subaccountInfo = await client.query('subaccount_info', {
    subaccount_id: subaccountId.toNumber(),
  });
  console.log('Subaccount info', JSON.stringify(subaccountInfo, null, 2));

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
  const signedOrder = {
    order,
    signature: await getSignedTransactionRequest({
      chainId,
      requestParams: order,
      requestType: 'place_order',
      signer,
      verifyingContract: orderbookAddr,
    }),
  };
  const orderDigest = await client.placeOrder({
    chainId,
    orderbookAddress: orderbookAddr,
    productId,
    signedOrder,
  });
  console.log('Done placing order');

  const subaccountOrders = await client.query('subaccount_orders', {
    product_id: productId,
    subaccount_id: subaccountId.toNumber(),
  });
  console.log('Subaccount orders', JSON.stringify(subaccountOrders));
  const marketLiquidity = await client.query('market_liquidity', {
    depth: 10,
    product_id: productId,
  });
  console.log('Market liquidity', JSON.stringify(marketLiquidity, null, 2));
  const marketPrice = await client.query('market_price', {
    product_id: productId,
  });
  console.log('Market price', JSON.stringify(marketPrice, null, 2));
  const queriedOrder = await client.query('order', {
    digest: orderDigest,
    product_id: productId,
  });
  console.log('Queried order', JSON.stringify(queriedOrder, null, 2));

  console.log('Cancelling order');
  await client.cancelOrder({
    chainId,
    orderbookAddress: orderbookAddr,
    productId,
    signedOrder,
  });
  console.log('Done cancelling order');

  const subaccountOrdersAfterCancel = await client.query('subaccount_orders', {
    product_id: productId,
    subaccount_id: subaccountId.toNumber(),
  });
  console.log(
    'Subaccount orders after cancellation',
    JSON.stringify(subaccountOrdersAfterCancel),
  );

  await client.teardown();
}

main();
