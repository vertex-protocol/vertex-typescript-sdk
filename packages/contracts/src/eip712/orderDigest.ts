import { hashTypedData } from 'viem';
import { getVertexEIP712Domain } from './getVertexEIP712Domain';
import { getVertexEIP712PrimaryType } from './getVertexEIP712PrimaryType';
import { getVertexEIP712Types } from './getVertexEIP712Types';
import { getVertexEIP712Values } from './getVertexEIP712Values';
import {
  EIP712IsolatedOrderParams,
  EIP712OrderParams,
} from './signatureParamTypes';

interface OrderDigestParams {
  order: EIP712OrderParams;
  verifyingAddr: string;
  chainId: number;
}

/**
 * Returns the EIP712 digest for an order
 *
 * @param params
 */
export function getOrderDigest(params: OrderDigestParams): string {
  const { chainId, order, verifyingAddr } = params;
  return hashTypedData({
    domain: getVertexEIP712Domain(verifyingAddr, chainId),
    message: getVertexEIP712Values('place_order', order),
    primaryType: getVertexEIP712PrimaryType('place_order'),
    types: getVertexEIP712Types('place_order'),
  });
}

interface IsolatedOrderDigestParams {
  order: EIP712IsolatedOrderParams;
  verifyingAddr: string;
  chainId: number;
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
  // For digest purposes, we use the same types as the place_order, not place_isolated_order
  return hashTypedData({
    domain: getVertexEIP712Domain(verifyingAddr, chainId),
    message: getVertexEIP712Values('place_order', order),
    primaryType: getVertexEIP712PrimaryType('place_order'),
    types: getVertexEIP712Types('place_order'),
  });
}
