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
          { name: 'sender', type: 'bytes32' },
          { name: 'productId', type: 'uint32' },
          { name: 'amount', type: 'uint128' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'mint_lp':
      return {
        MintLp: [
          { name: 'sender', type: 'bytes32' },
          { name: 'productId', type: 'uint32' },
          { name: 'amountBase', type: 'uint128' },
          { name: 'quoteAmountLow', type: 'uint128' },
          { name: 'quoteAmountHigh', type: 'uint128' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'burn_lp':
      return {
        BurnLp: [
          { name: 'sender', type: 'bytes32' },
          { name: 'productId', type: 'uint32' },
          { name: 'amount', type: 'uint128' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'place_order':
      return {
        Order: [
          { name: 'sender', type: 'bytes32' },
          { name: 'priceX18', type: 'int128' },
          { name: 'amount', type: 'int128' },
          { name: 'expiration', type: 'uint64' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'cancel_orders':
      return {
        Cancellation: [
          { name: 'sender', type: 'bytes32' },
          { name: 'productIds', type: 'uint32[]' },
          { name: 'digests', type: 'bytes32[]' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'cancel_product_orders':
      return {
        CancellationProducts: [
          { name: 'sender', type: 'bytes32' },
          { name: 'productIds', type: 'uint32[]' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
    case 'liquidate_subaccount':
      return {
        LiquidateSubaccount: [
          { name: 'sender', type: 'bytes32' },
          { name: 'liquidatee', type: 'bytes32' },
          { name: 'mode', type: 'uint8' },
          { name: 'healthGroup', type: 'uint32' },
          { name: 'amount', type: 'int128' },
          { name: 'nonce', type: 'uint64' },
        ],
      };
  }
}
