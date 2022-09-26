import {
  LiquidateSubaccountParams,
  SignedOrderParams,
  SignedTx,
  WithdrawCollateralParams,
} from './eip712';
import { defaultAbiCoder } from '@ethersproject/abi';
import { toX18 } from '@vertex-protocol/utils';

/*
In general, things aren't being used, but keeping for now
 */

export function encodeSignedLiquidateSubaccountTx(
  signed: SignedTx<LiquidateSubaccountParams>,
) {
  return defaultAbiCoder.encode(
    [
      'tuple(tuple(address sender, string subaccountName, uint64 liquidateeId, uint32 productId, int256 amount, uint64 nonce), bytes signature)',
    ],
    [
      [
        [
          signed.tx.sender,
          signed.tx.subaccountName,
          signed.tx.liquidateeId,
          signed.tx.productId,
          signed.tx.amount,
          signed.tx.nonce,
        ],
        signed.signature,
      ],
    ],
  );
}

export function encodeSignedWithdrawCollateralTx(
  signed: SignedTx<WithdrawCollateralParams>,
) {
  return defaultAbiCoder.encode(
    [
      'tuple(tuple(address sender, string subaccountName, uint32 productId, int256 amount, uint64 nonce), bytes signature)',
    ],
    [
      [
        [
          signed.tx.sender,
          signed.tx.subaccountName,
          signed.tx.productId,
          signed.tx.amount,
          signed.tx.nonce,
        ],
        signed.signature,
      ],
    ],
  );
}

export function encodeSignedOrder(signed: SignedOrderParams) {
  return defaultAbiCoder.encode(
    [
      'tuple(tuple(address sender, string subaccountName, int256 priceX18, int256 amount, uint64 expiration, uint64 nonce) order, bytes signature)',
    ],
    [
      [
        [
          signed.order.sender,
          signed.order.subaccountName,
          toX18(signed.order.price),
          signed.order.amount,
          signed.order.expiration,
          signed.order.nonce,
        ],
        signed.signature,
      ],
    ],
  );
}
