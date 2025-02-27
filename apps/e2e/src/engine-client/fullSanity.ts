import {
  calcBorrowRateForTimeRange,
  calcRealizedDepositRateForTimeRange,
  createDeterministicLinkedSignerPrivateKey,
  depositCollateral,
  Endpoint__factory,
  getChainIdFromSigner,
  getIsolatedOrderDigest,
  getOrderDigest,
  getOrderNonce,
  IClearinghouse__factory,
  MockERC20__factory,
  ProductEngineType,
  subaccountFromBytes32,
  subaccountFromHex,
  subaccountToBytes32,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import {
  EngineClient,
  EngineIsolatedOrderParams,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';
import {
  TimeInSeconds,
  toBigDecimal,
  toFixedPoint,
  toX18,
} from '@vertex-protocol/utils';
import { Wallet, ZeroAddress } from 'ethers';
import { getExpiration } from '../utils/getExpiration';
import { prettyPrint } from '../utils/prettyPrint';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';

async function fullSanity(context: RunContext) {
  const signer = context.getWallet();
  const chainId = await getChainIdFromSigner(signer);

  const client = new EngineClient({
    url: context.endpoints.engine,
    signer,
  });

  const clearinghouseAddr = context.contracts.clearinghouse;
  const clearinghouse = IClearinghouse__factory.connect(
    clearinghouseAddr,
    signer,
  );
  const quote = MockERC20__factory.connect(
    await clearinghouse.getQuote(),
    signer,
  );
  const endpointAddr = await clearinghouse.getEndpoint();
  const endpoint = Endpoint__factory.connect(endpointAddr, signer);
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

  console.log('Querying subaccount');
  const subaccountInfo = await client.getSubaccountSummary({
    subaccountOwner: signer.address,
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

  console.log('Placing order');
  const spotProductId = 1;
  const spotOrderbookAddr = await client.getOrderbookAddress(spotProductId);
  const spotOrder: EngineOrderParams = {
    subaccountOwner: signer.address,
    subaccountName: 'default',
    amount: toFixedPoint(-0.03),
    expiration: getExpiration(),
    price: 110000,
  };
  const spotPlaceOrderResult = await client.placeOrder({
    verifyingAddr: spotOrderbookAddr,
    chainId,
    productId: spotProductId,
    order: spotOrder,
    nonce: getOrderNonce(),
  });
  const spotOrderDigest = getOrderDigest({
    order: spotPlaceOrderResult.orderParams,
    verifyingAddr: spotOrderbookAddr,
    chainId,
  });
  prettyPrint('Done placing spot order', spotPlaceOrderResult);

  if (spotOrderDigest !== spotPlaceOrderResult.data.digest) {
    throw Error(
      `Computed and returned order digests do not match. Computed: ${spotOrderDigest}. Returned: ${spotPlaceOrderResult.data.digest}`,
    );
  }

  console.log('Placing isolated order');
  const perpProductId = 2;
  const perpOrderbookAddr = await client.getOrderbookAddress(perpProductId);
  const isolatedOrder: EngineIsolatedOrderParams = {
    subaccountOwner: signer.address,
    subaccountName: 'default',
    amount: toX18(-0.03),
    expiration: getExpiration(),
    price: 110000,
    // 10x leverage
    margin: toX18((0.03 * 110000) / 10),
  };
  const perpPlaceIsolatedOrderResult = await client.placeIsolatedOrder({
    verifyingAddr: perpOrderbookAddr,
    chainId,
    productId: perpProductId,
    order: isolatedOrder,
    nonce: getOrderNonce(),
  });
  prettyPrint('Done placing isolated order', perpPlaceIsolatedOrderResult);
  const perpIsolatedOrderDigest = getIsolatedOrderDigest({
    order: perpPlaceIsolatedOrderResult.orderParams,
    verifyingAddr: perpOrderbookAddr,
    chainId,
  });

  if (perpIsolatedOrderDigest !== perpPlaceIsolatedOrderResult.data.digest) {
    throw Error(
      `Computed and returned isolated order digests do not match. Computed: ${perpIsolatedOrderDigest}. Returned: ${perpPlaceIsolatedOrderResult.data.digest}`,
    );
  }

  const subaccountOrders = await client.getSubaccountOrders({
    productId: 2,
    subaccountName: 'default',
    subaccountOwner: signer.address,
  });
  prettyPrint('Subaccount orders', subaccountOrders);

  const marketLiquidity = await client.getMarketLiquidity({
    depth: 10,
    productId: spotProductId,
  });
  prettyPrint('Market liquidity', marketLiquidity);

  const marketPrice = await client.getMarketPrice({
    productId: spotProductId,
  });
  prettyPrint('Market price', marketPrice);

  const marketPrices = await client.getMarketPrices({
    productIds: [spotProductId, 2, 3],
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
    productId: spotProductId,
    price: toBigDecimal(100000),
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
    digest: spotOrderDigest,
    productId: spotProductId,
  });
  prettyPrint('Queried spot order', queriedOrder);

  const queriedIsolatedOrder = await client.getOrder({
    digest: perpIsolatedOrderDigest,
    productId: perpProductId,
  });
  prettyPrint('Queried perp isolated order', queriedIsolatedOrder);

  const queriedOrders = await client.getSubaccountMultiProductOrders({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productIds: [spotProductId, perpProductId],
  });
  prettyPrint('Queried orders', queriedOrders);

  console.log('Cancelling orders');
  const cancelResult = await client.cancelOrders({
    subaccountName: 'default',
    subaccountOwner: signer.address,
    productIds: [spotProductId, perpProductId],
    digests: [spotOrderDigest, perpIsolatedOrderDigest],
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done cancelling orders', cancelResult);

  const subaccountOrdersAfterCancel = await client.getSubaccountOrders({
    productId: spotProductId,
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

  // Open an iso position
  const createIsoPositionOrder: EngineIsolatedOrderParams = {
    subaccountOwner: signer.address,
    subaccountName: 'default',
    amount: toX18(0.03),
    expiration: getExpiration('fok'),
    price: 110000,
    // 10x leverage
    margin: toX18((0.03 * 110000) / 10),
  };
  const createIsoPositionOrderResult = await client.placeIsolatedOrder({
    verifyingAddr: perpOrderbookAddr,
    chainId,
    productId: perpProductId,
    order: createIsoPositionOrder,
    nonce: getOrderNonce(),
  });
  prettyPrint('Done creating isolated position', createIsoPositionOrderResult);

  const isoPositions = await client.getIsolatedPositions({
    subaccountOwner: signer.address,
    subaccountName: 'default',
  });
  prettyPrint('Isolated positions', isoPositions);

  const mintSpotLpResult = await client.mintLp({
    subaccountOwner: signer.address,
    subaccountName: 'default',
    productId: 3,
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(3000, 18),
    quoteAmountHigh: toFixedPoint(6000, 18),
    verifyingAddr: endpointAddr,
    chainId,
  });
  prettyPrint('Done minting spot lp', mintSpotLpResult);

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
  for (const productId of [spotProductId, perpProductId]) {
    console.log('Placing order for product', productId);
    const orderbookAddr = await client.getOrderbookAddress(productId);
    const order: EngineOrderParams = {
      subaccountOwner: signer.address,
      subaccountName: 'default',
      amount: toFixedPoint(-0.01),
      expiration: getExpiration(),
      price: 38000,
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

  for (const productId of [spotProductId, perpProductId]) {
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

  const minDepositRates = await client.getMinDepositRates();

  prettyPrint('Min deposit rates', minDepositRates);

  subaccountInfoAtEnd.balances.forEach((balance) => {
    if (balance.type == ProductEngineType.SPOT) {
      const minDepositRate =
        minDepositRates.minDepositRates[balance.productId].minDepositRate;
      console.log('product', balance.productId);
      console.log('min Deposit Rate', minDepositRate.toNumber());
      console.log(
        'deposit APR',
        calcRealizedDepositRateForTimeRange(
          balance,
          TimeInSeconds.YEAR,
          0.2,
          minDepositRate,
        ).toNumber() * 100,
      );
      console.log(
        'borrow APR',
        calcBorrowRateForTimeRange(
          balance,
          TimeInSeconds.YEAR,
          minDepositRate,
        ).toNumber() * 100,
      );
    }
  });

  const transferQuoteResult = await client.transferQuote({
    chainId,
    recipientSubaccountName: 'transfer1',
    subaccountOwner: signer.address,
    subaccountName: 'default',
    amount: toFixedPoint(50), // amount must be x18
    verifyingAddr: endpointAddr,
  });
  prettyPrint('Done transferring quote', transferQuoteResult);
}

runWithContext(fullSanity);
