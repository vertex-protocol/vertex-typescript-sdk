import { WithContract } from '../common';
import { BigNumberish } from 'ethers';

export interface ExecuteDepositCollateralParams {
  subaccountName: string;
  productId: number;
  amount: BigNumberish;
}

/**
 * Deposits collateral through the Endpoint contract, which will be picked up automatically by the sequencer and
 * submitted.
 *
 */
export async function depositCollateral({
  endpoint,
  subaccountName,
  productId,
  amount,
}: WithContract<'endpoint', ExecuteDepositCollateralParams>) {
  return endpoint.depositCollateral(subaccountName, productId, amount);
}
