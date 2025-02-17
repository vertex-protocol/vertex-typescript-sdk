import { IERC20 } from '../typechain-types';
import { WithContract } from '../common';
import { BigDecimalish, toBigInt } from '@vertex-protocol/utils';

export interface ApproveDepositAllowanceParams {
  amount: BigDecimalish;
  tokenContract: IERC20;
}

/**
 * Approves the endpoint contract to spend the amount of tokens specified
 */
export async function approveDepositAllowance({
  endpoint,
  amount,
  tokenContract,
}: WithContract<'endpoint', ApproveDepositAllowanceParams>) {
  return tokenContract.approve(await endpoint.getAddress(), toBigInt(amount));
}
