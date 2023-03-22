import { createVertexClient } from './createVertexClient';
import { ethers, Wallet } from 'ethers';
import { nowInSeconds, toFixedPoint } from '@vertex-protocol/utils';
import { OrderActionParams } from './apis/market';
import { OrderParams, subaccountToHex } from '@vertex-protocol/contracts';
import { getOrderNonce } from '@vertex-protocol/engine-client';

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
    price: 28000,
    amount: toFixedPoint(0.01),
  };

  const verifyingAddr = (await vertexClient.context.engineClient.getContracts())
    .orderbookAddrs[1];

  // Websocket payloads
  const wsOrder = {
    ...orderParams,
    subaccountOwner: await signer.getAddress(),
    nonce: getOrderNonce(),
  };

  console.log(`WS Order ${JSON.stringify(wsOrder, null, 2)}`);

  const wsOrderSig = await vertexClient.context.engineClient.sign(
    'place_order',
    verifyingAddr,
    wsOrder,
  );

  const wsPlaceOrderReq = (
    await vertexClient.ws.execute.buildPlaceOrderPayload({
      productId: 1,
      order: wsOrder,
      signature: wsOrderSig,
    })
  ).payload;

  console.log(
    `Place Order WS request: ${JSON.stringify(wsPlaceOrderReq, null, 2)}`,
  );

  const wsPlaceOrderRes = await vertexClient.context.engineClient.execute(
    'place_order',
    wsPlaceOrderReq,
  );

  console.log(
    `Place Order WS response:  ${JSON.stringify(wsPlaceOrderRes, null, 2)}`,
  );

  const wsOrderDigest = await vertexClient.context.engineClient.getOrderDigest(
    wsOrder as OrderParams,
    verifyingAddr,
  );

  const wsCancelOrdersReq =
    await vertexClient.ws.execute.buildCancelOrdersPayload({
      subaccountOwner: await signer.getAddress(),
      subaccountName: 'default',
      productIds: [1],
      digests: [wsOrderDigest],
      signature: '',
    });

  console.log(
    `Cancel Orders WS request: ${JSON.stringify(wsCancelOrdersReq, null, 2)}`,
  );

  const wsMintLpReq = await vertexClient.ws.execute.buildMintLpPayload({
    productId: 1,
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    amountBase: toFixedPoint(1, 18),
    quoteAmountLow: toFixedPoint(1000, 18),
    quoteAmountHigh: toFixedPoint(2000, 18),
    signature: '',
  });

  console.log(`Mint LP WS request: ${JSON.stringify(wsMintLpReq, null, 2)}`);

  const wsBurnLpReq = await vertexClient.ws.execute.buildBurnLpPayload({
    productId: 1,
    subaccountOwner: await signer.getAddress(),
    subaccountName: 'default',
    amount: toFixedPoint(1, 18),
    signature: '',
  });

  console.log(`Burn LP WS request: ${JSON.stringify(wsBurnLpReq, null, 2)}`);

  const wsWithdrawCollateralReq =
    await vertexClient.ws.execute.buildWithdrawCollateralPayload({
      subaccountOwner: signer.address,
      subaccountName: 'default',
      productId: 0,
      amount: toFixedPoint(4999, 6),
      signature: '',
    });

  console.log(
    `Withdraw collateral WS request: ${JSON.stringify(
      wsWithdrawCollateralReq,
      null,
      2,
    )}`,
  );

  const wsQuerySubaccountInfoReq = vertexClient.ws.query.buildPayload(
    'subaccount_info',
    {
      subaccount: subaccountToHex({
        subaccountOwner: signer.address,
        subaccountName: 'default',
      }),
    },
  );

  console.log(
    `Query subaccount info WS request: ${JSON.stringify(
      wsQuerySubaccountInfoReq,
      null,
      2,
    )}`,
  );
}

main().catch((e) => console.log(e));
