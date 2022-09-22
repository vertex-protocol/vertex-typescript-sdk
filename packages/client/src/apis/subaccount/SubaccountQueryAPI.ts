import { BaseVertexAPI } from '../base';
import {
  getSubaccountSummary,
  GetSubaccountSummaryParams,
} from '@vertex-protocol/contracts';
import { GetSubaccountsParams } from '@vertex-protocol/graph';

export class SubaccountQueryAPI extends BaseVertexAPI {
  /**
   * {@link (VertexGraphClient.getSubaccountsForAddress)}
   */
  async getSubaccountsForAddress(params: GetSubaccountsParams) {
    return this.context.graph.getSubaccountsForAddress(params);
  }

  /**
   * {@link (getSubaccountSummary:CONTRACTS)}
   */
  async getSubaccountSummary(params: GetSubaccountSummaryParams) {
    return getSubaccountSummary(this.paramsWithContracts(params));
  }

  /**
   * Gets the subaccount state according to the offchain engine
   * @param params
   */
  async getEngineSubaccountSummary(params: GetSubaccountSummaryParams) {
    return this.context.engineClient.getSubaccountSummary(params);
  }
}
