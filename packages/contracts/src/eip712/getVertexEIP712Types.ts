import { SignableRequestType } from './signableRequestType';
import { TypedDataField } from '@ethersproject/abstract-signer';

/**
 * Return the EIP712 types for a given request
 *
 * @param requestType
 */
export function getVertexEIP712Types(
  requestType: SignableRequestType,
): Record<string, Array<TypedDataField>> {
  switch (requestType) {
    case 'depositCollateral':
      return {
        DepositCollateral: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'productId', type: 'uint32' },
          { name: 'amount', type: 'uint256' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'withdrawCollateral':
      return {
        WithdrawCollateral: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'productId', type: 'uint32' },
          { name: 'amount', type: 'uint256' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'placeOrder':
      return {
        Order: [
          { name: 'subaccount', type: 'uint64' },
          { name: 'priceX18', type: 'int256' },
          { name: 'amount', type: 'int256' },
          { name: 'expiration', type: 'uint64' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'cancelOrder':
      return {
        Cancellation: [
          { name: 'subaccount', type: 'uint64' },
          { name: 'priceX18', type: 'int256' },
          { name: 'amount', type: 'int256' },
          { name: 'expiration', type: 'uint64' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'liquidateSubaccount':
      return {
        LiquidateSubaccount: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'liquidateeId', type: 'uint64' },
          { name: 'productId', type: 'uint32' },
          { name: 'amount', type: 'int256' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
  }
}
