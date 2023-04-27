import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';
import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { getVertexEIP712Domain } from './getVertexEIP712Domain';
import { getVertexEIP712Types } from './getVertexEIP712Types';
import { getVertexEIP712Values } from './getVertexEIP712Values';

interface Params<TReqType extends SignableRequestType> {
  requestType: TReqType;
  requestParams: SignableRequestTypeToParams[TReqType];
  // Allow explicit definition of `chainId` to enable signing for different chains
  chainId: number;
  // Orderbook for orders, Sequencer for other requests
  verifyingContract: string;
  signer: TypedDataSigner;
}

export function getSignedTransactionRequest<
  TReqType extends SignableRequestType,
>(params: Params<TReqType>) {
  const domain = getVertexEIP712Domain(
    params.verifyingContract,
    params.chainId,
  );
  const types = getVertexEIP712Types(params.requestType);
  const values = getVertexEIP712Values(
    params.requestType,
    params.requestParams,
  );

  console.log('getSignedTransactionRequest', domain, types, values);

  return params.signer._signTypedData(domain, types, values);
}
