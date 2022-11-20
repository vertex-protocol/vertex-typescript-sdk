import { createVertexClient } from './createVertexClient';
import { ethers, Wallet } from 'ethers';
import { nowInSeconds } from '@vertex-protocol/utils';
import { OrderActionParams } from './apis/market';

function getNonce() {
  return Date.now();
}

async function main() {
  const signer = new Wallet(
    'xxx',
    new ethers.providers.StaticJsonRpcProvider(
      'https://goerli-rollup.arbitrum.io/rpc',
      {
        name: 'arbitrum-goerli',
        chainId: 421613,
      },
    ),
  );

  const vertexClient = await createVertexClient('testnet', {
    // Specify different signers/providers if needed
    chainSignerOrProvider: signer,
    engineSigner: signer,
  });

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

  const orderParams: OrderActionParams['order'] = {
    subaccountName: 'default',
    // `nowInSeconds` is exposed by the `@vertex-protocol/utils` package
    // This gives 60s before the order expires
    expiration: nowInSeconds() + 60,
    // Limit price
    price: 1,
    amount: 1,
  };

  const { digest } = await vertexClient.market.placeOrder({
    order: orderParams,
    // Product you're sending the order for
    productId: 1,
  });

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

  const subaccountId = await vertexClient.subaccount.getSubaccountId({
    address: await signer.getAddress(),
    name: 'default',
  });
  // State from engine
  await vertexClient.subaccount.getEngineSubaccountSummary({ subaccountId });
  // State from Arbitrum
  await vertexClient.subaccount.getSubaccountSummary({ subaccountId });
  await vertexClient.market.getOpenSubaccountOrders({
    sender: await signer.getAddress(),
    subaccountName: 'default',
    productId: 1,
  });

  await vertexClient.context.graph.getSubaccountOrders({ subaccountId });

  await vertexClient.spot.withdraw({
    subaccountName: 'default',
    productId: 0,
    amount: 10,
  });
}

main();
