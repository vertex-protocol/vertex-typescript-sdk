import { BigNumber, ethers, Wallet } from 'ethers';
import {
  depositCollateral,
  IClearinghouse__factory,
  IEndpoint__factory,
  MockERC20__factory,
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import { nowInSeconds, toFixedPoint } from '@vertex-protocol/utils';
import { EngineClient } from './EngineClient';
import { OrderParamsWithoutNonce } from './types';

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

  const subaccountBytes32 = subaccountToBytes32(signer.address, 'default');
  const subaccountHex = subaccountToHex(signer.address, 'default');
  console.log(`subaccountBytes32: ${subaccountBytes32}`);
  console.log(`subaccountHex: ${subaccountHex}`);

  const subaccountFrom32BytesOut = subaccountFromBytes32(subaccountBytes32);
  const subaccountFromHexOut = subaccountFromHex(subaccountHex);
  console.log(
    `subaccountFrom32Bytes (out): ${subaccountFrom32BytesOut.owner}; ${subaccountFrom32BytesOut.name}`,
  );

  console.log(
    `subaccountFromHex (out): ${subaccountFromHexOut.owner}; ${subaccountFromHexOut.name}`,
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
    sender: signer.address,
    subaccountName: 'default',
  });
  console.log('Subaccount info', JSON.stringify(subaccountInfo, null, 2));

  const products = await client.getAllMarkets();
  console.log('All products', JSON.stringify(products, null, 2));

  console.log('Placing order');
  const productId = 1;
  const orderbookAddr = await clearinghouse.getOrderbook(productId);
  const order: OrderParamsWithoutNonce = {
    sender: signer.address,
    subaccountName: 'default',
    amount: -1,
    expiration: getExpiration(),
    price: 23000,
  };
  const placeResult = await client.placeOrder({
    orderbookAddr,
    productId,
    order,
  });
  console.log('Done placing order', placeResult);

  const subaccountOrders = await client.getSubaccountOrders({
    productId,
    subaccountName: 'default',
    sender: signer.address,
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
    subaccountName: 'default',
    sender: signer.address,
    productIds: [productId],
    digests: [placeResult.digest],
    endpointAddr,
  });
  console.log('Done cancelling order', cancelResult);

  const subaccountOrdersAfterCancel = await client.getSubaccountOrders({
    productId,
    sender: signer.address,
    subaccountName: 'default',
  });
  console.log(
    'Subaccount orders after cancellation',
    JSON.stringify(subaccountOrdersAfterCancel),
  );

  const mintSpotLpResult = await client.mintLp({
    sender: signer.address,
    subaccountName: 'default',
    productId: 3,
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    endpointAddr,
  });
  console.log('Done minting spot lp', mintSpotLpResult);

  const mintPerpLpResult = await client.mintLp({
    sender: signer.address,
    subaccountName: 'default',
    productId: 4,
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    endpointAddr,
  });
  console.log('Done minting perp lp', mintPerpLpResult);

  const subaccountInfoAfterMintingLp = await client.getSubaccountSummary({
    sender: signer.address,
    subaccountName: 'default',
  });
  console.log(
    'Subaccount info after LP mint',
    JSON.stringify(subaccountInfoAfterMintingLp, null, 2),
  );

  const burnSpotLpResult = await client.burnLp({
    sender: signer.address,
    subaccountName: 'default',
    productId: 3,
    amount: toFixedPoint(1, 18),
    endpointAddr,
  });

  console.log('Done burning spot lp', burnSpotLpResult);

  const burnPerpLpResult = await client.burnLp({
    sender: signer.address,
    subaccountName: 'default',
    productId: 4,
    amount: toFixedPoint(1, 6),
    endpointAddr,
  });

  console.log('Done burning perp lp', burnPerpLpResult);

  const withdrawResult = await client.withdrawCollateral({
    sender: signer.address,
    subaccountName: 'default',
    productId: 0,
    amount: toFixedPoint(4999, 6),
    endpointAddr,
  });

  console.log('Done withdrawing collateral, result', withdrawResult);

  const subaccountInfoAtEnd = await client.getSubaccountSummary({
    sender: signer.address,
    subaccountName: 'default',
  });
  console.log('Subaccount info', JSON.stringify(subaccountInfoAtEnd, null, 2));
}

main().catch((e) => console.log(e));
