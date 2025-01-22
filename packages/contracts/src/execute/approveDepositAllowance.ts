import { IERC20 } from '../typechain-types';
import { WithContract } from '../common';

export interface ApproveDepositAllowanceParams {
  amount: string;
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
  return tokenContract.approve(await endpoint.getAddress(), BigInt(amount));
}
