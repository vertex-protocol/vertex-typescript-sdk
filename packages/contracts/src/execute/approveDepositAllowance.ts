import { BigNumberish } from 'ethers';
import { IERC20 } from '../typechain-types';
import { WithContract } from '../common';

export interface ApproveDepositAllowanceParams {
  amount: BigNumberish;
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
  return tokenContract.approve(endpoint.address, amount);
}
