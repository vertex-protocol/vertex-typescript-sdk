import { OrdersClient } from './OrdersClient';
import { BigNumber, ethers, Wallet } from 'ethers';
import {
  getContractOrderStruct,
  getOrderDigestEthers,
  getSignedOrderStruct,
  IClearinghouse__factory,
  IOffchainBook__factory,
  OrderbookOrder,
  OrderbookRequest,
} from '@vertex-protocol/contracts';
import { fromX18, MaxUint64 } from '@vertex-protocol/utils';

const LOCALHOST = 'http://localhost:80';
const TESTNET =
  'http://load-appli-2uvu9ksv59sz-1062943129.us-east-2.elb.amazonaws.com/api';

async function main() {
  const client = new OrdersClient({
    endpoint: 'http://localhost:80',
  });
  const signer = new Wallet(
    // Hardhat deployer
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    new ethers.providers.JsonRpcProvider(),
  );
  const clearinghouse = IClearinghouse__factory.connect(
    '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    signer,
  );
  const subaccountId = await clearinghouse.getSubaccountId(
    signer.address,
    'default',
  );
  const orderbookAddress = await clearinghouse.getOrderbook(1);
  const orderbook = IOffchainBook__factory.connect(orderbookAddress, signer);

  console.log('Subaccount ID', subaccountId.toString());
  console.log('Orderbook address', orderbookAddress);

  const order: OrderbookOrder = {
    amount: 10,
    expiration: MaxUint64,
    nonce: Date.now().toFixed(0),
    price: fromX18(BigNumber.from('1500000000000000000')).toString(),
    subaccountId,
  };
  const orderRequest: OrderbookRequest = {
    order,
    action: 'order',
  };

  const signedOrderStruct = await getSignedOrderStruct({
    request: orderRequest,
    orderbookAddress,
    chainId: await signer.getChainId(),
    signer: signer,
  });

  const { digest } = await client.submitOrder({
    order: signedOrderStruct,
    orderbookAddress,
  });
  const ethersDigest = await getOrderDigestEthers({
    request: orderRequest,
    action: 'order',
    orderbookAddress,
    chainId: await signer.getChainId(),
  });
  const contractDigest = await orderbook.getDigest(
    getContractOrderStruct(order),
    false,
  );

  console.log('Sent order', digest, ethersDigest, contractDigest);

  if (digest.toString() !== ethersDigest.toString()) {
    throw Error('Digests do not match');
  }

  const cancelRequest: OrderbookRequest = {
    order,
    action: 'cancellation',
  };
  const signedCancelOrderStruct = await getSignedOrderStruct({
    request: cancelRequest,
    orderbookAddress,
    chainId: await signer.getChainId(),
    signer: signer,
  });
  const { digest: cancelDigest } = await client.cancelOrder({
    order: signedCancelOrderStruct,
    orderbookAddress,
  });

  console.log('Canceled order', cancelDigest);

  async function logState() {
    const subaccountOrders = await client.getSubaccountOrders({
      orderbookAddress,
      subaccountId,
    });
    const liquidity = await client.getBookLiquidity({
      depth: 10,
      orderbookAddress,
    });
    console.log('Subaccount orders', JSON.stringify(subaccountOrders, null, 2));
    console.log('Liquidity', JSON.stringify(liquidity, null, 2));
  }

  logState();
}

main();