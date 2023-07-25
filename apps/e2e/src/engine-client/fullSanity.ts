import { RunContext } from '../utils/types';
import {
  EngineClient,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';
import {
  createDeterministicLinkedSignerPrivateKey,
  depositCollateral,
  Endpoint__factory,
  getChainIdFromSigner,
  getOrderNonce,
  IClearinghouse__factory,
  MockERC20__factory,
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import { toBigDecimal, toFixedPoint } from '@vertex-protocol/utils';
import { Wallet, ZeroAddress } from 'ethers';
import { runWithContext } from '../utils/runWithContext';
import { getExpiration } from '../utils/getExpiration';
import { prettyPrint } from '../utils/prettyPrint';

async function fullSanity(context: RunContext) {
  const signer = context.getWallet();
  const chainId = await getChainIdFromSigner(signer);

  const client = new EngineClient({
    url: context.endpoints.engine,
    signer,
  });

  const clearinghouseAddr = context.contracts.clearinghouse;
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
  prettyPrint('Subaccount info', subaccountInfo);

  const products = await client.getAllMarkets();
  prettyPrint('All products', products);

  const healthGroups = await client.getHealthGroups();
  prettyPrint('Health groups', healthGroups);

  console.log('Placing order');
  const productId = 1;
  const orderbookAddr = await clearinghouse.getOrderbook(productId);
  const order: EngineOrderParams = {
    subaccountOwner: signer.address,
    subaccountName: 'default',
    amount: toFixedPoint(-0.01),
    expiration: getExpiration(),
    price: 35000,
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
  prettyPrint('Done placing spot order', placeResult);

  const subaccountOrders = await client.getSubaccountOrders({
    productId: 2,
    subaccountName: 'default',
    subaccountOwner: signer.address,
  });
  prettyPrint('Subaccount orders', subaccountOrders);

  const marketLiquidity = await client.getMarketLiquidity({
    depth: 10,
    productId,
  });
  prettyPrint('Market liquidity', marketLiquidity);

  const marketPrice = await client.getMarketPrice({
    productId,
  });
  prettyPrint('Market price', marketPrice);

  const marketPrices = await client.getMarketPrices({
    productIds: [productId, 2, 3],
  });
  prettyPrint('Market prices', marketPrices);

  const feeRates = await client.getSubaccountFeeRates({
    subaccountName: 'default',
    subaccountOwner: signer.address,
  });
  prettyPrint('Fee rates', feeRates);

  const maxOrderSize = await client.getMaxOrderSize({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId,
    price: toBigDecimal(28000),
    side: 'long',
  });
  prettyPrint('Max order size', maxOrderSize);

  const maxWithdrawable = await client.getMaxWithdrawable({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
  });
  prettyPrint('Max withdrawable', maxWithdrawable);

  const maxWithdrawableNoSpotLeverage = await client.getMaxWithdrawable({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
    spotLeverage: false,
  });
  prettyPrint(
    'Max withdrawable no spot leverage',
    maxWithdrawableNoSpotLeverage,
  );

  const queriedOrder = await client.getOrder({
    digest: orderDigest,
    productId,
  });
  prettyPrint('Queried order', queriedOrder);

  const queriedOrders = await client.getSubaccountMultiProductOrders({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productIds: [productId],
  });
  prettyPrint('Queried orders', queriedOrders);

  console.log('Cancelling order');
  const cancelResult = await client.cancelOrders({
    subaccountName: 'default',
    subaccountOwner: signer.address,
    productIds: [productId],
    digests: [orderDigest],
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done cancelling order', cancelResult);

  const subaccountOrdersAfterCancel = await client.getSubaccountOrders({
    productId,
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  prettyPrint('Subaccount orders after cancel', subaccountOrdersAfterCancel);

  const maxWithdrawableAfterCancel = await client.getMaxWithdrawable({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 0,
  });
  prettyPrint('Max withdrawable after cancel', maxWithdrawableAfterCancel);

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
  prettyPrint('Done linking signer', linkSignerResult);

  const linkedSignerQueryResponse = await client.getLinkedSigner({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  prettyPrint(
    'Linked signer, setting engine client to use the new signer',
    linkedSignerQueryResponse,
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
  prettyPrint('Done minting spot lp', mintSpotLpResult);

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
  prettyPrint('Done minting perp lp', mintPerpLpResult);

  const subaccountInfoAfterMintingLp = await client.getSubaccountSummary({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  prettyPrint('Subaccount info after LP mint', subaccountInfoAfterMintingLp);

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
  prettyPrint('Done burning spot lp', burnSpotLpResult);

  const burnPerpLpResult = await client.burnLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 4,
    amount: toFixedPoint(1, 6),
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done burning perp lp', burnPerpLpResult);

  // Revoke signer
  const revokeSignerResult = await client.linkSigner({
    chainId,
    signer: subaccountToHex({
      subaccountOwner: ZeroAddress,
      subaccountName: '',
    }),
    subaccountOwner: signer.address,
    subaccountName: 'default',
    verifyingAddr: endpointAddr,
  });
  client.setLinkedSigner(null);
  prettyPrint('Done revoking signer', revokeSignerResult);

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
    prettyPrint('Done placing order', placeResult);

    const subaccountOrdersAfterPlace = await client.getSubaccountOrders({
      productId,
      subaccountOwner: signer.address,
      subaccountName: 'default',
    });

    prettyPrint('Subaccount Orders after place', subaccountOrdersAfterPlace);

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
  prettyPrint('Cancel Product Orders', cancelProductOrdersRes);

  for (const productId of [1, 2]) {
    const subaccountOrdersAfterCancel = await client.getSubaccountOrders({
      productId,
      subaccountOwner: signer.address,
      subaccountName: 'default',
    });

    prettyPrint(
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
  prettyPrint('Done withdrawing collateral, result', withdrawResult);

  const subaccountInfoAtEnd = await client.getSubaccountSummary({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  prettyPrint('Subaccount info after withdraw collateral', subaccountInfoAtEnd);
}

runWithContext(fullSanity);
