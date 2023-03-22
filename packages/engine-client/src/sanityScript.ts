import { BigNumber, ethers, Wallet } from 'ethers';
import {
  depositCollateral,
  IClearinghouse__factory,
  IEndpoint__factory,
  MockERC20__factory,
  OrderParams,
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import {
  nowInSeconds,
  toBigDecimal,
  toFixedPoint,
} from '@vertex-protocol/utils';
import { EngineClient } from './EngineClient';
import { EngineOrderParams } from './types';
import { getOrderNonce } from './utils';

function getExpiration() {
  return nowInSeconds() + 1000;
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
  const clearinghouseAddr = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
  const quoteAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const quote = await MockERC20__factory.connect(quoteAddr, signer);
  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddr,
    signer,
  );
  const endpointAddr = await clearinghouse.getEndpoint();
  const endpoint = await IEndpoint__factory.connect(endpointAddr, signer);
  await (await quote.mint(signer.address, toFixedPoint(10000, 6))).wait();
  await (await quote.approve(endpointAddr, toFixedPoint(10000, 6))).wait();
  // Deposit collateral
  const depositTx = await depositCollateral({
    amount: toFixedPoint(10000, 6),
    endpoint,
    productId: 0,
    subaccountName: 'default',
  });
  await depositTx.wait();
  console.log('Done depositing collateral');
  // Wait for slow mode
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`subaccount (in): ${signer.address}; default`);
  const subaccountBytes32 = subaccountToBytes32({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  const subaccountHex = subaccountToHex({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  console.log(`subaccountBytes32: ${subaccountBytes32}`);
  console.log(`subaccountHex: ${subaccountHex}`);
  const subaccountFrom32BytesOut = subaccountFromBytes32(subaccountBytes32);
  const subaccountFromHexOut = subaccountFromHex(subaccountHex);
  console.log(
    `subaccountFrom32Bytes (out): ${subaccountFrom32BytesOut.subaccountOwner}; ${subaccountFrom32BytesOut.subaccountName}`,
  );
  console.log(
    `subaccountFromHex (out): ${subaccountFromHexOut.subaccountOwner}; ${subaccountFromHexOut.subaccountName}`,
  );
  let subaccountId;
  while (true) {
    subaccountId = BigNumber.from(
      await endpoint.getSubaccountId(subaccountBytes32),
    );
    if (!subaccountId.isZero()) {
      break;
    }
  }
  console.log('Subaccount ID', subaccountId.toString());
  console.log('Querying subaccount');
  const subaccountInfo = await client.getSubaccountSummary({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  console.log('Subaccount info', JSON.stringify(subaccountInfo, null, 2));
  const products = await client.getAllMarkets();
  console.log('All products', JSON.stringify(products, null, 2));
  console.log('Placing order');
  const productId = 2;
  const orderbookAddr = await clearinghouse.getOrderbook(productId);
  const order: EngineOrderParams = {
    subaccountOwner: signer.address,
    subaccountName: 'default',
    amount: toFixedPoint(-0.01),
    expiration: getExpiration(),
    price: 28000,
  };
  const placeResult = await client.placeOrder({
    verifyingAddr: orderbookAddr,
    productId,
    order,
    nonce: getOrderNonce(),
  });
  const orderDigest = await client.getOrderDigest(
    placeResult.orderParams,
    orderbookAddr,
  );
  console.log('Done placing spot order', placeResult);
  const subaccountOrders = await client.getSubaccountOrders({
    productId,
    subaccountName: 'default',
    subaccountOwner: signer.address,
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
  const feeRates = await client.getSubaccountFeeRates({
    subaccountName: 'default',
    subaccountOwner: signer.address,
  });
  console.log('Fee rates', JSON.stringify(feeRates, null, 2));
  const maxOrderSize = await client.getMaxOrderSize({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId,
    price: toBigDecimal(28000),
    side: 'long',
  });
  console.log('Max order size', JSON.stringify(maxOrderSize, null, 2));
  const maxWithdrawable = await client.getMaxWithdrawable({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
  });
  console.log('Max withdrawable', JSON.stringify(maxWithdrawable, null, 2));
  const maxWithdrawableNoSpotLeverage = await client.getMaxWithdrawable({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
    spotLeverage: false,
  });
  console.log(
    'Max withdrawable no spot leverage',
    JSON.stringify(maxWithdrawableNoSpotLeverage, null, 2),
  );
  const queriedOrder = await client.getOrder({
    digest: orderDigest,
    productId,
  });
  console.log('Queried order', JSON.stringify(queriedOrder, null, 2));
  console.log('Cancelling order');
  const cancelResult = await client.cancelOrders({
    subaccountName: 'default',
    subaccountOwner: signer.address,
    productIds: [productId],
    digests: [orderDigest],
    verifyingAddr: endpointAddr,
  });
  console.log('Done cancelling order', cancelResult);
  const subaccountOrdersAfterCancel = await client.getSubaccountOrders({
    productId,
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  console.log(
    'Subaccount orders after cancellation',
    JSON.stringify(subaccountOrdersAfterCancel),
  );
  const maxWithdrawableAfterCancel = await client.getMaxWithdrawable({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
  });
  console.log(
    'Max withdrawable after cancel order',
    JSON.stringify(maxWithdrawableAfterCancel, null, 2),
  );
  const mintSpotLpResult = await client.mintLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 3,
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    verifyingAddr: endpointAddr,
  });
  console.log('Done minting spot lp', mintSpotLpResult);
  const mintPerpLpResult = await client.mintLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 4,
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    verifyingAddr: endpointAddr,
  });
  console.log('Done minting perp lp', mintPerpLpResult);
  const subaccountInfoAfterMintingLp = await client.getSubaccountSummary({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  console.log(
    'Subaccount info after LP mint',
    JSON.stringify(subaccountInfoAfterMintingLp, null, 2),
  );
  const burnSpotLpResult = await client.burnLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 3,
    amount: toFixedPoint(1, 18),
    verifyingAddr: endpointAddr,
  });
  console.log('Done burning spot lp', burnSpotLpResult);
  const burnPerpLpResult = await client.burnLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 4,
    amount: toFixedPoint(1, 6),
    verifyingAddr: endpointAddr,
  });
  console.log('Done burning perp lp', burnPerpLpResult);
  const withdrawResult = await client.withdrawCollateral({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
    amount: toFixedPoint(4999, 6),
    verifyingAddr: endpointAddr,
  });
  console.log('Done withdrawing collateral, result', withdrawResult);
  const subaccountInfoAtEnd = await client.getSubaccountSummary({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  console.log(
    'Subaccount info after withdraw collateral',
    JSON.stringify(subaccountInfoAtEnd, null, 2),
  );
}

main().catch((e) => console.log(e));
