import { TypedDataEncoder } from 'ethers';
import { getVertexEIP712Domain } from './getVertexEIP712Domain';
import { getVertexEIP712Types } from './getVertexEIP712Types';
import { getVertexEIP712Values } from './getVertexEIP712Values';
import {
  EIP712IsolatedOrderParams,
  EIP712OrderParams,
} from './signatureParamTypes';
import { BigDecimalish } from '@vertex-protocol/utils';

interface OrderDigestParams {
  order: EIP712OrderParams;
  verifyingAddr: string;
  chainId: BigDecimalish;
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

interface IsolatedOrderDigestParams {
  order: EIP712IsolatedOrderParams;
  verifyingAddr: string;
  chainId: BigDecimalish;
}

/**
 * Returns the EIP712 digest for an isolated order
 *
 * @param params
 */
export function getIsolatedOrderDigest(
  params: IsolatedOrderDigestParams,
): string {
  const { chainId, order, verifyingAddr } = params;
  return TypedDataEncoder.hash(
    getVertexEIP712Domain(verifyingAddr, chainId),
    // For digest purposes, we use the same types as the place_order, not place_isolated_order
    getVertexEIP712Types('place_order'),
    getVertexEIP712Values('place_order', order),
  );
}
