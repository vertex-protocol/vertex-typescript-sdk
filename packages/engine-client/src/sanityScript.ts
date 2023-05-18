import { ethers, Wallet } from 'ethers';
import {
  createDeterministicLinkedSignerPrivateKey,
  depositCollateral,
  Endpoint__factory,
  IClearinghouse__factory,
  MockERC20__factory,
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import {
  nowInSeconds,
  toBigDecimal,
  toFixedPoint,
  toPrintableObject,
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
  const chainId = await signer.getChainId();
  const client = new EngineClient({
    url: 'http://localhost:80/api',
    signer,
  });
  const clearinghouseAddr = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddr,
    signer,
  );
  const quote = await MockERC20__factory.connect(
    await clearinghouse.getQuote(),
    signer,
  );
  const endpointAddr = await clearinghouse.getEndpoint();
  const endpoint = await Endpoint__factory.connect(endpointAddr, signer);
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
  console.log('Querying subaccount');
  const subaccountInfo = await client.getSubaccountSummary({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  console.log('Subaccount info', JSON.stringify(subaccountInfo, null, 2));
  const products = await client.getAllMarkets();
  console.log('All products', JSON.stringify(products, null, 2));
  console.log('Placing order');
  const productId = 1;
  const orderbookAddr = await clearinghouse.getOrderbook(productId);
  const order: EngineOrderParams = {
    subaccountOwner: signer.address,
    subaccountName: 'default',
    amount: toFixedPoint(-0.01),
    expiration: getExpiration() + 100000,
    price: 28900,
  };
  const placeResult = await client.placeOrder({
    verifyingAddr: orderbookAddr,
    chainId,
    productId,
    order,
    nonce: getOrderNonce(),
  });
  const orderDigest = client.getOrderDigest(
    placeResult.orderParams,
    orderbookAddr,
    chainId,
  );
  console.log('Done placing spot order', placeResult);
  const subaccountOrders = await client.getSubaccountOrders({
    productId: 2,
    subaccountName: 'default',
    subaccountOwner: signer.address,
  });
  console.log('Subaccount orders', subaccountOrders);
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
    chainId,
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
  const linkedSignerWalletPrivKey =
    await createDeterministicLinkedSignerPrivateKey({
      chainId,
      endpointAddress: endpointAddr,
      signer,
      subaccountOwner: signer.address,
      subaccountName: 'default',
    });
  const linkedSignerWallet = new Wallet(
    linkedSignerWalletPrivKey,
    signer.provider,
  );
  console.log(
    "Linked signer's wallet",
    linkedSignerWallet.address,
    linkedSignerWallet.privateKey,
  );
  const linkSignerResult = await client.linkSigner({
    chainId,
    signer: subaccountToHex({
      subaccountOwner: linkedSignerWallet.address,
      subaccountName: '',
    }),
    subaccountOwner: signer.address,
    subaccountName: 'default',
    verifyingAddr: endpointAddr,
  });
  console.log('Done linking signer', linkSignerResult);
  const linkedSignerQueryResponse = await client.getLinkedSigner({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  console.log(
    'Linked signer, setting engine client to use the new signer',
    toPrintableObject(linkedSignerQueryResponse),
  );
  client.setLinkedSigner(linkedSignerWallet);
  const mintSpotLpResult = await client.mintLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 3,
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    verifyingAddr: endpointAddr,
    chainId,
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
    chainId,
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
    chainId,
  });

  // Delay for rate limit
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log('Done burning spot lp', burnSpotLpResult);
  const burnPerpLpResult = await client.burnLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 4,
    amount: toFixedPoint(1, 6),
    verifyingAddr: endpointAddr,
    chainId,
  });
  console.log('Done burning perp lp', burnPerpLpResult);
  // Revoke signer
  const revokeSignerResult = await client.linkSigner({
    chainId,
    signer: subaccountToHex({
      subaccountOwner: ethers.constants.AddressZero,
      subaccountName: '',
    }),
    subaccountOwner: signer.address,
    subaccountName: 'default',
    verifyingAddr: endpointAddr,
  });
  client.setLinkedSigner(null);
  console.log('Done revoking signer', revokeSignerResult);

  // Delay for rate limit
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // places order for multiple products
  for (const productId of [1, 2]) {
    console.log('Placing order for product', productId);
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
      chainId,
    });
    console.log('Done placing order', placeResult);

    const subaccountOrdersAfterPlace = await client.getSubaccountOrders({
      productId,
      subaccountOwner: signer.address,
      subaccountName: 'default',
    });

    console.log('Subaccount Orders after place', subaccountOrdersAfterPlace);

    // Delay for rate limit
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // cancels orders for all products
  const cancelProductOrdersRes = await client.cancelProductOrders({
    subaccountName: 'default',
    subaccountOwner: signer.address,
    productIds: [],
    verifyingAddr: endpointAddr,
    chainId,
  });
  console.log('Cancel Product Orders', cancelProductOrdersRes);

  for (const productId of [1, 2]) {
    const subaccountOrdersAfterCancel = await client.getSubaccountOrders({
      productId,
      subaccountOwner: signer.address,
      subaccountName: 'default',
    });

    console.log(
      `Subaccount Orders after cancel for product ${productId}`,
      subaccountOrdersAfterCancel,
    );
  }

  const withdrawResult = await client.withdrawCollateral({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
    amount: toFixedPoint(4999, 6),
    verifyingAddr: endpointAddr,
    chainId,
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
