import {
  TypedDataDomain,
  TypedDataField,
  TypedDataSigner,
} from '@ethersproject/abstract-signer';
import { IOffchainBook } from '../typechain-types';

export type OrderAction = 'order' | 'cancellation';

interface OrderSigningParams {
  // Order to sign
  order: IOffchainBook.OrderStruct;
  // Address of the orderbook the order will be sent to
  orderbookAddress: string;
  // Either placing or cancelling
  action: OrderAction;
  // Chain ID for the signature
  chainId: number;
  signer: TypedDataSigner;
}

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
export function getVertexEIP712OrderValue(order: IOffchainBook.OrderStruct) {
  return {
    subaccount: order.subaccount.toString(),
    priceX18: order.priceX18.toString(),
    amount: order.amount.toString(),
    expiration: order.expiration.toString(),
    nonce: order.nonce.toString(),
  };
}

/**
 * Given an order, returns the fully signed order struct to submit to the matching engine
 *
 * @param params
 */
export async function getSignedOrderStruct(
  params: OrderSigningParams,
): Promise<IOffchainBook.SignedOrderStruct> {
  return {
    order: params.order,
    signature: await signContractOrderStruct(params),
  };
}

/**
 * Given an order, returns the signature given by EIP712 signing
 *
 * @param params
 */
export async function signContractOrderStruct(
  params: OrderSigningParams,
): Promise<string> {
  return params.signer._signTypedData(
    await getVertexEIP712OrderDataDomain(
      params.orderbookAddress,
      params.chainId,
    ),
    getVertexEIP712OrderTypes(params.action),
    getVertexEIP712OrderValue(params.order),
  );
}
