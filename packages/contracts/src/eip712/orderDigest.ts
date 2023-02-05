import { OrderParams } from './signatureParamTypes';
import { getVertexEIP712Domain } from './getVertexEIP712Domain';
import { getVertexEIP712Types } from './getVertexEIP712Types';
import { getVertexEIP712Values } from './getVertexEIP712Values';
import { ethers } from 'ethers';

interface OrderDigestParams {
  order: OrderParams;
  orderbookAddress: string;
  chainId: number;
}

/**
 * Returns the EIP712 digest for an order
 *
 * @param params
 */
export async function getOrderDigest(params: OrderDigestParams) {
  const { chainId, order, orderbookAddress } = params;
  return ethers.utils._TypedDataEncoder.hash(
    getVertexEIP712Domain(orderbookAddress, chainId),
    getVertexEIP712Types('place_order'),
    getVertexEIP712Values('place_order', order, true),
  );
}
