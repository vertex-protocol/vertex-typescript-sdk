import { WithContract } from '../common';
import { BigNumberish } from 'ethers';
import { subaccountNameToBytes12, bytesToStr, strToBytes } from '../utils';

export interface ExecuteDepositCollateralParams {
  subaccountName: string;
  productId: number;
  amount: BigNumberish;
  referralCode?: string;
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
  referralCode,
}: WithContract<'endpoint', ExecuteDepositCollateralParams>) {
  console.log('depositing collateral with referral:', referralCode);
  if (referralCode) {
    return endpoint.depositCollateralWithReferral(
      subaccountNameToBytes12(subaccountName),
      productId,
      amount,
      strToBytes(referralCode, 32),
    );
  } else {
    return endpoint.depositCollateral(
      subaccountNameToBytes12(subaccountName),
      productId,
      amount,
    );
  }
}
