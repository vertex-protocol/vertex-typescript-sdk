import { Wallet } from 'ethers';
import { nowInSeconds, toFixedPoint } from '@vertex-protocol/utils';
import { OrderActionParams } from '../apis/market';
import { subaccountToBytes32 } from '@vertex-protocol/contracts';
import { getProductMetadataByProductId } from '../utils';
import { getOrderNonce } from '@vertex-protocol/engine-client';
import { VertexClient } from '../client';

export async function fullSanity(signer: Wallet, vertexClient: VertexClient) {
  await vertexClient.spot._mintMockERC20({
    // 10 tokens
    amount: 10,
    productId: 0,
  });

  await vertexClient.spot.approveAllowance({
    amount: 10,
    productId: 0,
  });

  const depositTx = await vertexClient.spot.deposit({
    subaccountName: 'default',
    productId: 0,
    amount: 10,
  });
  await depositTx.wait();

  const orderNonce = getOrderNonce();

  const orderParams: OrderActionParams['order'] = {
    subaccountName: 'default',
    // `nowInSeconds` is exposed by the `@vertex-protocol/utils` package
    // This gives 60s before the order expires
    expiration: nowInSeconds() + 60,
    // Limit price
    price: 28000,
    amount: toFixedPoint(0.01),
  };

  const orderResult = await vertexClient.market.placeOrder({
    order: orderParams,
    // Product you're sending the order for
    productId: 1,
    nonce: orderNonce,
  });

  const verifyingAddr =
    await vertexClient.context.engineClient.getOrderbookAddress(1);

  const digest = await vertexClient.context.engineClient.getOrderDigest(
    orderResult.orderParams,
    verifyingAddr,
  );

  await vertexClient.market.cancelOrder({
    digests: [digest],
    productIds: [1],
    subaccountName: 'default',
  });

  // Fetches state from offchain sequencer
  await vertexClient.market.getAllEngineMarkets();
  // Fetches state from Arbitrum
  await vertexClient.market.getAllMarkets();
  await vertexClient.market.getLatestMarketPrice({ productId: 1 });
  await vertexClient.market.getMarketLiquidity({
    productId: 1,
    // Per side of the book
    depth: 100,
  });

  const subaccount = subaccountToBytes32({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });

  // State from engine
  await vertexClient.subaccount.getEngineSubaccountSummary({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });
  // State from Arbitrum
  await vertexClient.subaccount.getSubaccountSummary({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });
  await vertexClient.market.getOpenSubaccountOrders({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    productId: 1,
  });

  await vertexClient.context.graph.getSubaccountOrders({
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
  });

  await vertexClient.spot.withdraw({
    subaccountName: 'default',
    productId: 0,
    amount: 10,
  });

  console.log('Products metatada (spot)');
  const spotProductId = 1;
  console.log(getProductMetadataByProductId('testnet', spotProductId));
  console.log(getProductMetadataByProductId('mainnet', spotProductId));

  console.log('Products metatada (perp)');
  const perpProductId = 2;
  console.log(getProductMetadataByProductId('testnet', perpProductId));
  console.log(getProductMetadataByProductId('mainnet', perpProductId));

  console.log('Invalid product');
  const invalidProductId = 10000;
  console.log(getProductMetadataByProductId('testnet', invalidProductId));
  console.log(getProductMetadataByProductId('mainnet', invalidProductId));
}
