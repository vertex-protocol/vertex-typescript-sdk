import { BaseVertexAPI } from '../base';
import {
  getSubaccountSummary,
  GetSubaccountSummaryParams,
  subaccountToBytes32,
} from '@vertex-protocol/contracts';
import {
  GetEngineEstimatedSubaccountSummaryParams,
  GetEngineSubaccountFeeRatesParams,
  GetEngineSubaccountSummaryParams,
} from '@vertex-protocol/engine-client';
import { GetSubaccountIdParams } from './types';
import {
  GetIndexerLinkedSignerParams,
  GetIndexerReferralCodeParams,
} from '@vertex-protocol/indexer-client';

export class SubaccountQueryAPI extends BaseVertexAPI {
  /**
   * Calls contract directly to get a subaccount ID, returns a number to make things easier
   */
  async getSubaccountId(params: GetSubaccountIdParams): Promise<number> {
    const bnId = await this.context.contracts.endpoint.getSubaccountId(
      subaccountToBytes32({
        subaccountOwner: params.address,
        subaccountName: params.name,
      }),
    );
    return Number(bnId);
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

  /**
   * Queries engine to get subaccount fee rates
   * @param params
   */
  async getSubaccountFeeRates(params: GetEngineSubaccountFeeRatesParams) {
    return this.context.engineClient.getSubaccountFeeRates(params);
  }

  /**
   * Retrieves the current signer and link signer rate limit from the indexer
   * @param params
   */
  async getSubaccountLinkedSignerWithRateLimit(
    params: GetIndexerLinkedSignerParams,
  ) {
    return this.context.indexerClient.getLinkedSignerWithRateLimit(params);
  }

  /**
   * Retrieves referral code for an address
   * @param params
   */
  async getReferralCode(params: GetIndexerReferralCodeParams) {
    return this.context.indexerClient.getReferralCode(params);
  }
}
