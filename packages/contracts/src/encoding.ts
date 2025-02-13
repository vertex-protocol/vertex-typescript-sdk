import {
  SignedEIP712OrderParams,
  SignedTx,
  EIP712WithdrawCollateralParams,
} from './eip712';
import { toX18 } from '@vertex-protocol/utils';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

export function encodeSignedWithdrawCollateralTx(
  signed: SignedTx<EIP712WithdrawCollateralParams>,
) {
  return encodeAbiParameters(
    parseAbiParameters(
      '(tuple(address sender, string subaccountName, uint32 productId, uint128 amount, uint64 nonce), bytes signature)',
    ),
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

export function encodeSignedOrder(signed: SignedEIP712OrderParams) {
  return encodeAbiParameters(
    parseAbiParameters(
      '(tuple(tuple(address sender, string subaccountName, int128 priceX18, int128 amount, uint64 expiration, uint64 nonce), bytes signature))',
    ),
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
