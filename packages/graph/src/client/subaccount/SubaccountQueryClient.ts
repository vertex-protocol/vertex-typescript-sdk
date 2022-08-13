import { BaseVertexGraphClient } from '../base';
import { GetSubaccountsParams, GetSubaccountsResponse } from './types';

export class SubaccountQueryClient extends BaseVertexGraphClient {
  async getSubaccountsForAddress(
    params: GetSubaccountsParams,
  ): Promise<GetSubaccountsResponse> {
    const data = await this.graph.SubaccountsForAddress({
      address: params.address,
    });
    return data.subaccounts;
  }
}
