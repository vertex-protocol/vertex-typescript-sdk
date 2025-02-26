import { WalletClientWithAccount } from '../common';
import { getVertexEIP712Domain } from './getVertexEIP712Domain';
import { getVertexEIP712PrimaryType } from './getVertexEIP712PrimaryType';
import { getVertexEIP712Types } from './getVertexEIP712Types';
import { getVertexEIP712Values } from './getVertexEIP712Values';
import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';

interface Params<TReqType extends SignableRequestType> {
  requestType: TReqType;
  requestParams: SignableRequestTypeToParams[TReqType];
  // Allow explicit definition of `chainId` to enable signing for different chains
  chainId: number;
  // Orderbook for orders, Sequencer for other requests
  verifyingContract: string;
  walletClient: WalletClientWithAccount;
}

export function getSignedTransactionRequest<
  TReqType extends SignableRequestType,
>(params: Params<TReqType>) {
  return params.walletClient.signTypedData({
    domain: getVertexEIP712Domain(params.verifyingContract, params.chainId),
    types: getVertexEIP712Types(params.requestType),
    primaryType: getVertexEIP712PrimaryType(params.requestType),
    message: getVertexEIP712Values(params.requestType, params.requestParams),
  });
}
