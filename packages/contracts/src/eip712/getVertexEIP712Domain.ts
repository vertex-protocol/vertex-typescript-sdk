import { TypedDataDomain } from 'abitype';
import { Address } from 'viem';

/**
 * Gives the EIP712 data domain for order signing
 *
 * @param contractAddress usually the address of the orderbook (for orders) or sequencer (for other operations)
 * @param chainId
 */
export function getVertexEIP712Domain(
  contractAddress: string,
  chainId: number,
): TypedDataDomain {
  return {
    name: 'Vertex',
    version: '0.0.1',
    chainId,
    verifyingContract: contractAddress as Address,
  };
}
