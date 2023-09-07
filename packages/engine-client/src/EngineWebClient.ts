import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineServerTokenClaimProofResponse,
  EngineServerTokenClaimTotalAmountsResponse,
  GetEngineIpCheckResponse,
  GetEngineTimeResponse,
  GetEngineTokenClaimProofParams,
  GetEngineTokenClaimProofResponse,
  GetEngineTokenClaimTotalAmountsParams,
  GetEngineTokenClaimTotalAmountsResponse,
} from './types';
import axios from 'axios';
import { toBigDecimal } from '@vertex-protocol/utils';

/**
 * Queries that talk directly to web, _not_ the engine. Placing here in the `engine-client` as we don't have enough
 * use cases to justify a separate package
 */
export class EngineWebClient extends EngineBaseClient {
  /**
   * Retrieve the token claim proof and total amount claimable for the subaccount for a given epoch and address
   * @param params
   */
  async getTokenClaimProof(
    params: GetEngineTokenClaimProofParams,
  ): Promise<GetEngineTokenClaimProofResponse> {
    const serializedQuery = new URLSearchParams({
      // URLSearchParams expects only string values
      epoch: params.epoch.toString(),
      address: params.address,
    }).toString();
    const baseResponse = await axios.get<EngineServerTokenClaimProofResponse>(
      `${this.opts.url}/proof?${serializedQuery}`,
    );

    return {
      proof: baseResponse.data.proof,
      totalAmount: toBigDecimal(baseResponse.data.total_amount),
    };
  }

  /**
   * Retrieve the total amounts claimable for the subaccount for all epochs
   *
   * @param params
   */
  async getTokenClaimTotalAmounts(
    params: GetEngineTokenClaimTotalAmountsParams,
  ): Promise<GetEngineTokenClaimTotalAmountsResponse> {
    const baseResponse =
      await axios.get<EngineServerTokenClaimTotalAmountsResponse>(
        `${this.opts.url}/proof?address=${params.address}`,
      );

    return {
      totalAmounts: baseResponse.data.total_amounts.map(toBigDecimal),
    };
  }

  /**
   * Determines whether client IP is blocked from interacting with the engine
   */
  async checkIp(): Promise<GetEngineIpCheckResponse> {
    return axios.get(`${this.opts.url}/ip`).then((res) => res.data);
  }

  /**
   * Retrieves current server epoch in milliseconds
   */
  async getTime(): Promise<GetEngineTimeResponse> {
    return axios.get(`${this.opts.url}/time`).then((res) => res.data);
  }
}
