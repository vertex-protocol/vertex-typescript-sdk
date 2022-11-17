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
    case 'withdraw_collateral':
      return {
        WithdrawCollateral: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'productId', type: 'uint32' },
          { name: 'amount', type: 'uint256' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'mint_lp':
      return {
        Order: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'productId', type: 'uint32' },
          { name: 'amountBase', type: 'int256' },
          { name: 'quoteAmountLow', type: 'int256' },
          { name: 'quoteAmountHigh', type: 'int256' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'burn_lp':
      return {
        Order: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'productId', type: 'uint32' },
          { name: 'amount', type: 'int256' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'place_order':
      return {
        Order: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'priceX18', type: 'int256' },
          { name: 'amount', type: 'int256' },
          { name: 'expiration', type: 'uint64' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'cancel_order':
      return {
        Cancellation: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'priceX18', type: 'int256' },
          { name: 'amount', type: 'int256' },
          { name: 'expiration', type: 'uint64' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'liquidate_subaccount':
      return {
        LiquidateSubaccount: [
          { name: 'sender', type: 'address' },
          { name: 'subaccountName', type: 'string' },
          { name: 'liquidateeId', type: 'uint64' },
          { name: 'mode', type: 'uint8' },
          { name: 'healthGroup', type: 'uint32' },
          { name: 'amount', type: 'int256' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
  }
}
