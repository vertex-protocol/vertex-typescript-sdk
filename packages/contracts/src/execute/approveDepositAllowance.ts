import { BigDecimalish, toBigInt } from '@vertex-protocol/utils';
import { ERC20_ABI, WithContract, WriteableContract } from '../common';

export interface ApproveDepositAllowanceParams {
  amount: BigDecimalish;
  tokenContract: WriteableContract<typeof ERC20_ABI>;
}

/**
 * Approves the endpoint contract to spend the amount of tokens specified
 */
export function approveDepositAllowance({
  endpoint,
  amount,
  tokenContract,
}: WithContract<'endpoint', ApproveDepositAllowanceParams>) {
  return tokenContract.write.approve([endpoint.address, toBigInt(amount)]);
}
