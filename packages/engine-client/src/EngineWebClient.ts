import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineServerTokenClaimProofResponse,
  GetEngineIpCheckResponse,
  GetEngineTimeResponse,
  GetEngineTokenClaimProofParams,
  GetEngineTokenClaimProofResponse,
} from './types';
import axios from 'axios';
import { toBigDecimal } from '@vertex-protocol/utils';
import { getBytes } from 'ethers';

/**
 * Queries that talk directly to web, _not_ the engine. Placing here in the `engine-client` as we don't have enough
 * use cases to justify a separate package
 */
export class EngineWebClient extends EngineBaseClient {
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
      proof: baseResponse.data.proof.map((item) => getBytes(item)),
      totalAmount: toBigDecimal(baseResponse.data.total_amount),
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
