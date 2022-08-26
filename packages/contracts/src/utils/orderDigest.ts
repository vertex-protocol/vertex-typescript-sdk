import { IOffchainBook } from '../typechain-types';
import { _TypedDataEncoder } from 'ethers/lib/utils';
import {
  getVertexEIP712OrderDataDomain,
  getVertexEIP712OrderTypes,
  getVertexEIP712OrderValue,
  OrderAction,
} from '../execute';

interface OrderDigestParams {
  order: IOffchainBook.OrderStruct;
  action: OrderAction;
  orderbookAddress: string;
  chainId: number;
}

export async function getOrderDigestEthers(params: OrderDigestParams) {
  const { action, chainId, order, orderbookAddress } = params;
  return _TypedDataEncoder.hash(
    getVertexEIP712OrderDataDomain(orderbookAddress, chainId),
    getVertexEIP712OrderTypes(action),
    getVertexEIP712OrderValue(order),
  );
}
