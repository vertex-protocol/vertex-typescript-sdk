import { _TypedDataEncoder } from 'ethers/lib/utils';
import {
  getContractOrderStruct,
  getVertexEIP712OrderDataDomain,
  getVertexEIP712OrderTypes,
  getVertexEIP712OrderValue,
} from '../execute';
import { OrderAction, OrderbookRequest } from '../common';

interface OrderDigestParams {
  request: OrderbookRequest;
  action: OrderAction;
  orderbookAddress: string;
  chainId: number;
}

export async function getOrderDigestEthers(params: OrderDigestParams) {
  const { action, chainId, request, orderbookAddress } = params;
  return _TypedDataEncoder.hash(
    getVertexEIP712OrderDataDomain(orderbookAddress, chainId),
    getVertexEIP712OrderTypes(action),
    getVertexEIP712OrderValue(getContractOrderStruct(request.order)),
  );
}
