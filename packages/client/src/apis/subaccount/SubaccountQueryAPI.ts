import { BaseVertexAPI } from '../base';
import {
  getSubaccountSummary,
  GetSubaccountSummaryParams,
} from '@vertex-protocol/contracts';
import { GetSubaccountsParams } from '@vertex-protocol/graph';
import { GetSubaccountIdParams } from './queryTypes';
import {
  GetEngineEstimatedSubaccountSummaryParams,
  GetEngineSubaccountSummaryParams,
} from '@vertex-protocol/engine-client';

export class SubaccountQueryAPI extends BaseVertexAPI {
  /**
   * Calls contract directly to get a subaccount ID, returns a number to make things easier
   */
  async getSubaccountId(params: GetSubaccountIdParams): Promise<number> {
    const bnId = await this.context.contracts.clearinghouse.getSubaccountId(
      params.address,
      params.name,
    );
    return Number(bnId);
  }

  /**
   * Calls engine to get a subaccount ID
   */
  async getEngineSubaccountId(params: GetSubaccountIdParams) {
    return this.context.engineClient.getSubaccountId({
      address: params.address,
      subaccountName: params.name,
    });
  }

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
