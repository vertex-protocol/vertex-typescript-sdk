import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';
import { getVertexEIP712Domain } from './getVertexEIP712Domain';
import { getVertexEIP712Types } from './getVertexEIP712Types';
import { getVertexEIP712Values } from './getVertexEIP712Values';
import { BigNumberish, Signer } from 'ethers';

interface Params<TReqType extends SignableRequestType> {
  requestType: TReqType;
  requestParams: SignableRequestTypeToParams[TReqType];
  // Allow explicit definition of `chainId` to enable signing for different chains
  chainId: BigNumberish;
  // Orderbook for orders, Sequencer for other requests
  verifyingContract: string;
  signer: Signer;
}

export function getSignedTransactionRequest<
  TReqType extends SignableRequestType,
>(params: Params<TReqType>) {
  return params.signer.signTypedData(
    getVertexEIP712Domain(params.verifyingContract, params.chainId),
    getVertexEIP712Types(params.requestType),
    getVertexEIP712Values(params.requestType, params.requestParams),
  );
}
