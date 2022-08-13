import { SubaccountsForAddressQuery } from '../../generated';

export interface GetSubaccountsParams {
  address: string;
}

export type GetSubaccountsResponse = SubaccountsForAddressQuery['subaccounts'];
