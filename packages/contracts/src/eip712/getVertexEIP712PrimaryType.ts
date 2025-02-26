import { getVertexEIP712Types } from './getVertexEIP712Types';
import { SignableRequestType } from './signableRequestType';

/**
 * Return the primary EIP712 type for a given request
 *
 * @param requestType
 */
export function getVertexEIP712PrimaryType(requestType: SignableRequestType) {
  const types = getVertexEIP712Types(requestType);
  // We assume the first key is the primary type. Currently, all Vertex EIP712 messages only have one type
  return Object.keys(types)[0];
}
