import {
  SignedOrderParams,
  SignedTx,
  WithdrawCollateralParams,
} from './eip712';
import { defaultAbiCoder } from '@ethersproject/abi';
import { toX18 } from '@vertex-protocol/utils';

export function encodeSignedWithdrawCollateralTx(
  signed: SignedTx<WithdrawCollateralParams>,
) {
  return defaultAbiCoder.encode(
    [
      'tuple(tuple(address sender, string subaccountName, uint32 productId, uint128 amount, uint64 nonce), bytes signature)',
    ],
    [
      [
        [
          signed.tx.subaccountOwner,
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
      'tuple(tuple(address sender, string subaccountName, int128 priceX18, int128 amount, uint64 expiration, uint64 nonce) order, bytes signature)',
    ],
    [
      [
        [
          signed.order.subaccountOwner,
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
