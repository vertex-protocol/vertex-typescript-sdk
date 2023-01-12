import { createVertexClient } from './createVertexClient';
import { ethers, Wallet } from 'ethers';
import { nowInSeconds } from '@vertex-protocol/utils';
import { OrderActionParams } from './apis/market';
import { VertexClient } from './client';

export type SetupType = 'testnet' | 'local';

async function setup(type: SetupType): Promise<[ethers.Wallet, VertexClient]> {
  switch (type) {
    case 'testnet': {
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
        chainSignerOrProvider: signer,
        engineSigner: signer,
      });

      return [signer, vertexClient];
    }
    case 'local': {
      const signer = new Wallet(
        'a0dff2b40838cef1ae86ddd11b8c2a34aa52d2d6f4355e3eb9abbaaf8eccee91',
        new ethers.providers.StaticJsonRpcProvider('http://0.0.0.0:8545', {
          name: 'localhost',
          chainId: 1337,
        }),
      );
      const vertexClient = await createVertexClient(
        {
          contracts: {
            querierAddress: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
            spotEngineAddress: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
            perpEngineAddress: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
            clearinghouseAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
            endpointAddress: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
          },
          graph: {
            coreEndpoint: '',
            marketsEndpoint: '',
            candlesticksEndpoint: '',
          },
          offchainEngineEndpoint: 'http://localhost:80/api',
        },
        {
          chainSignerOrProvider: signer,
          engineSigner: signer,
        },
      );

      return [signer, vertexClient];
    }
  }
}

function getNonce() {
  return Date.now();
}

async function main() {
  const [signer, vertexClient] = await setup('local');
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

  // const orderParams: OrderActionParams['order'] = {
  //   subaccountName: 'default',
  //   // `nowInSeconds` is exposed by the `@vertex-protocol/utils` package
  //   // This gives 60s before the order expires
  //   expiration: nowInSeconds() + 60,
  //   // Limit price
  //   price: 1,
  //   amount: 1,
  // };

  // const { digest } = await vertexClient.market.placeOrder({
  //   order: orderParams,
  //   // Product you're sending the order for
  //   productId: 1,
  // });

  // await vertexClient.market.cancelOrder({
  //   digests: [digest],
  //   productIds: [1],
  //   subaccountName: 'default',
  // });

  // // Fetches state from offchain sequencer
  // await vertexClient.market.getAllEngineMarkets();
  // // Fetches state from Arbitrum
  // await vertexClient.market.getAllMarkets();
  // await vertexClient.market.getLatestMarketPrice({ productId: 1 });
  // await vertexClient.market.getMarketLiquidity({
  //   productId: 1,
  //   // Per side of the book
  //   depth: 100,
  // });

  // const subaccountId = await vertexClient.subaccount.getSubaccountId({
  //   address: await signer.getAddress(),
  //   name: 'default',
  // });
  // // State from engine
  // await vertexClient.subaccount.getEngineSubaccountSummary({ subaccountId });
  // // State from Arbitrum
  // await vertexClient.subaccount.getSubaccountSummary({ subaccountId });
  // await vertexClient.market.getOpenSubaccountOrders({
  //   sender: await signer.getAddress(),
  //   subaccountName: 'default',
  //   productId: 1,
  // });

  // await vertexClient.context.graph.getSubaccountOrders({ subaccountId });

  // await vertexClient.spot.withdraw({
  //   subaccountName: 'default',
  //   productId: 0,
  //   amount: 10,
  // });
}

main();
