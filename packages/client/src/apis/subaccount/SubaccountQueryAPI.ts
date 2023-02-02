import { BaseVertexAPI } from '../base';
import {
  getSubaccountSummary,
  GetSubaccountSummaryParams,
} from '@vertex-protocol/contracts';
import { GetSubaccountsParams } from '@vertex-protocol/graph';
import {
  GetEngineEstimatedSubaccountSummaryParams,
  GetEngineSubaccountSummaryParams,
} from '@vertex-protocol/engine-client';

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
  async getEngineSubaccountSummary(params: GetEngineSubaccountSummaryParams) {
    return this.context.engineClient.getSubaccountSummary(params);
  }

  /**
   * Gets the estimated subaccount state from offchain engine after a series of proposed txs
   * @param params
   */
  async getEngineEstimatedSubaccountSummary(
    params: GetEngineEstimatedSubaccountSummaryParams,
  ) {
    return this.context.engineClient.getEstimatedSubaccountSummary(params);
  }
}
