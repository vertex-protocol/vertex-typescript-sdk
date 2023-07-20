import { OrderParams } from './signatureParamTypes';
import { getVertexEIP712Domain } from './getVertexEIP712Domain';
import { getVertexEIP712Types } from './getVertexEIP712Types';
import { getVertexEIP712Values } from './getVertexEIP712Values';
import { BigNumberish, TypedDataEncoder } from 'ethers';

interface OrderDigestParams {
  order: OrderParams;
  verifyingAddr: string;
  chainId: BigNumberish;
}

/**
 * Returns the EIP712 digest for an order
 *
 * @param params
 */
export function getOrderDigest(params: OrderDigestParams): string {
  const { chainId, order, verifyingAddr } = params;
  return TypedDataEncoder.hash(
    getVertexEIP712Domain(verifyingAddr, chainId),
    getVertexEIP712Types('place_order'),
    getVertexEIP712Values('place_order', order),
  );
}
