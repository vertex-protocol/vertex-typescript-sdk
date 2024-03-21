import { BigNumberish } from 'ethers';
import { WithContract } from '../common';
import { subaccountNameToBytes12 } from '../utils';

export interface DepositCollateralParams {
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
}: WithContract<'endpoint', DepositCollateralParams>) {
  const bytesSubaccountName = subaccountNameToBytes12(subaccountName);
  if (referralCode) {
    return endpoint[
      'depositCollateralWithReferral(bytes12,uint32,uint128,string)'
    ](bytesSubaccountName, productId, amount, referralCode);
  } else {
    return endpoint.depositCollateral(bytesSubaccountName, productId, amount);
  }
}
