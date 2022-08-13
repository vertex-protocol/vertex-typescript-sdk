import { BaseVertexAPI } from '../base';
import {
  getSubaccountSummary,
  GetSubaccountSummaryParams,
} from '@vertex/contracts';
import { GetSubaccountsParams } from '@vertex/graph';

export class SubaccountQueryAPI extends BaseVertexAPI {
  // By address
  async getSubaccounts(params: GetSubaccountsParams) {
    return this.context.graph.getSubaccountsForAddress(params);
  }

  // From querier
  async getSubaccountSummary(params: GetSubaccountSummaryParams) {
    return getSubaccountSummary(this.paramsWithContracts(params));
  }

  // TODO: Events
  // async getAllEvents() {}
  //
  // async getLiquidationEvents() {}
  //
  // async getModifyCollateralEvents() {}
}
