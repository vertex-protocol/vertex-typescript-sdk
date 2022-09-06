import {
  TypedDataDomain,
  TypedDataField,
  TypedDataSigner,
} from '@ethersproject/abstract-signer';
import { OrderAction, OrderbookRequest } from '../common';
import { getContractOrderStruct } from './getContractOrderStruct';
import { ISequencer } from '../typechain-types/IOffchainBook';

interface SingleOrderSigningParams {
  // Order request to sign
  request: OrderbookRequest;
  // Address of the orderbook the order will be sent to
  orderbookAddress: string;
  // Chain ID for the signature
  chainId: number;
  signer: TypedDataSigner;
}

type BatchOrderSigningParams = Omit<SingleOrderSigningParams, 'request'> & {
  // Order requests to sign
  requests: OrderbookRequest[];
};

/**
 * Gives the EIP712 data domain for order signing
 *
 * @param orderbookAddress
 * @param chainId
 */
export function getVertexEIP712OrderDataDomain(
  orderbookAddress: string,
  chainId: number,
): TypedDataDomain {
  return {
    name: 'Vertex',
    version: '0.0.1',
    chainId: chainId,
    verifyingContract: orderbookAddress,
  };
}

/**
 * Gives the EIP712 data types for order signing
 *
 * @param action
 */
export function getVertexEIP712OrderTypes(
  action: OrderAction,
): { Order: Array<TypedDataField> } | { Cancellation: Array<TypedDataField> } {
  const types = [
    { name: 'subaccount', type: 'uint64' },
    { name: 'priceX18', type: 'int256' },
    { name: 'amount', type: 'int256' },
    { name: 'expiration', type: 'uint64' },
    { name: 'nonce', type: 'uint64' },
  ];
  return action === 'order'
    ? {
        Order: types,
      }
    : { Cancellation: types };
}

/**
 * Returns the EIP712 data value for order signing
 *
 * @param order
 */
export function getVertexEIP712OrderValue(order: ISequencer.OrderStruct) {
  return {
    subaccount: order.subaccount.toString(),
    priceX18: order.priceX18.toString(),
    amount: order.amount.toString(),
    expiration: order.expiration.toString(),
    nonce: order.nonce.toString(),
  };
}

/**
 * Given an order request, returns the fully signed order struct to submit to the matching engine
 *
 * @param params
 */
export async function getSignedOrderStruct(
  params: SingleOrderSigningParams,
): Promise<ISequencer.SignedOrderStruct> {
  return {
    order: getContractOrderStruct(params.request.order),
    signature: await signContractOrderStruct(params),
  };
}

/**
 * Given a batch of orders, sign them all
 *
 * @param params
 */
export async function getBatchSignedOrderStructs(
  params: BatchOrderSigningParams,
): Promise<ISequencer.SignedOrderStruct[]> {
  const { requests, ...restSigningParams } = params;
  return Promise.all(
    requests.map((request) =>
      getSignedOrderStruct({ ...restSigningParams, request }),
    ),
  );
}

/**
 * Given an order, returns the signature given by EIP712 signing
 *
 * @param params
 */
export async function signContractOrderStruct(
  params: SingleOrderSigningParams,
): Promise<string> {
  return params.signer._signTypedData(
    await getVertexEIP712OrderDataDomain(
      params.orderbookAddress,
      params.chainId,
    ),
    getVertexEIP712OrderTypes(params.request.action),
    getVertexEIP712OrderValue(getContractOrderStruct(params.request.order)),
  );
}
