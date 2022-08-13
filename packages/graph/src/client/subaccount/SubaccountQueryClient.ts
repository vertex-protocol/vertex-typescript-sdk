import { BaseVertexGraphClient } from '../base';
import { GetSubaccountsParams } from './types';

export class SubaccountQueryClient extends BaseVertexGraphClient {
  getSubaccountsForAddress(params: GetSubaccountsParams) {
    return this.graph.SubaccountsForAddress({ address: params.address });
  }
}
