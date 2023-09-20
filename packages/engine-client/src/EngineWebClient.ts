import { EngineBaseClient } from './EngineBaseClient';
import { GetEngineIpCheckResponse, GetEngineTimeResponse } from './types';
import axios from 'axios';

/**
 * Queries that talk directly to web, _not_ the engine. Placing here in the `engine-client` as we don't have enough
 * use cases to justify a separate package
 */
export class EngineWebClient extends EngineBaseClient {
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
