import { Signer } from 'ethers';
import {
  TypedDataDomain,
  TypedDataField,
  TypedDataSigner,
} from '@ethersproject/abstract-signer';
import { IOffchainBook } from '../typechain-types';

type ValidSigner = TypedDataSigner & Signer;
type OrderAction = 'order' | 'cancellation';

interface OrderSigningParams {
  // Order to sign
  order: IOffchainBook.OrderStruct;
  // Address of the orderbook the order will be sent to
  orderbookAddress: string;
  // Either placing or cancelling
  action: OrderAction;
  signer: ValidSigner;
}

/**
 * Gives the EIP712 data domain for order signing
 *
 * @param orderbookAddress
 * @param signer
 */
export async function getVertexEIP712DataDomain(
  orderbookAddress: string,
  signer: ValidSigner,
): Promise<TypedDataDomain> {
  return {
    name: 'Vertex',
    version: '0.0.1',
    chainId: await signer.getChainId(),
    verifyingContract: orderbookAddress,
  };
}

/**
 * Gives the EIP712 data types for order signing
 *
 * @param action
 */
export function getVertexEIP712Types(
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
    await getVertexEIP712DataDomain(params.orderbookAddress, params.signer),
    getVertexEIP712Types(params.action),
    {
      subaccount: params.order.subaccount.toString(),
      priceX18: params.order.priceX18.toString(),
      amount: params.order.amount.toString(),
      expiration: params.order.expiration.toString(),
      nonce: params.order.nonce.toString(),
    },
  );
}
