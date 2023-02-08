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
import { toFixedPoint } from '@vertex-protocol/utils';
import { EngineClient } from './EngineClient';

async function main() {
  const clearinghouseAddr = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
  const quoteAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const accounts = [
    '0xbc0af72214879b0b84bb1414e30f81d26216e50c5f0bcaaa8db5df78a7f7cbad', // liquidator
    '0x803db2d44f343ca0cf6615de269bfd20e2aa3b705bb63d2dd101d7521bd0ef1e', // price maintainer
    '0xf8d5a18f89180e220e13dae5b739dda8cb6ee3a8de30cd5a80a62fefdfa52fc4', // mm for BTC spot
    '0x4f295393013a5769f441e5af3ed0fb88b383e1d7f0fe4c2f655a176fb569a8ce', // mm for BTC perp
    '0x7b9e604b9deab586b01c99d412ab8d5673a9d8b021fc2162606613c84b5e2c31', // mm for ETH spot
    '0x5ae81c27cd8dcff37dab4199e8fa42fb8c979341e9c079b34914cc9bf4423576', // mm for ETH perp
  ];

  // this is only needed when running the script on local node.
  for (const account of accounts) {
    // Hardhat deployers
    const signer = new Wallet(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      new ethers.providers.JsonRpcProvider(),
    );

    const bot = new Wallet(account, new ethers.providers.JsonRpcProvider());

    await signer.sendTransaction({
      to: bot.address,
      value: ethers.utils.parseEther('1000.0'),
    });
  }

  for (const account of accounts) {
    const signer = new Wallet(account, new ethers.providers.JsonRpcProvider());
    const quote = await MockERC20__factory.connect(quoteAddr, signer);
    const clearinghouse = await IClearinghouse__factory.connect(
      clearinghouseAddr,
      signer,
    );
    const endpointAddr = await clearinghouse.getEndpoint();
    const endpoint = await IEndpoint__factory.connect(endpointAddr, signer);
    await (await quote.mint(signer.address, toFixedPoint(10, 18))).wait();
    await (await quote.approve(endpointAddr, toFixedPoint(10, 18))).wait();

    // Deposit collateral
    const depositTx = await depositCollateral({
      amount: toFixedPoint(10, 18),
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
      owner: signer.address,
      name: 'default',
    });
    const subaccountHex = subaccountToHex({
      owner: signer.address,
      name: 'default',
    });
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
  }
}

main().catch((e) => console.log(e));
