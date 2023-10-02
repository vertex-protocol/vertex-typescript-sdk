import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineServerIpBlockResponse,
  GetEngineIpCheckResponse,
  GetEngineTimeResponse,
} from './types';
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
    return (
      axios
        // Use the /time endpoint and listen to 403 responses
        .get(`${this.opts.url}/time`, {
          // Allow all statuses
          validateStatus: () => true,
        })
        .then((res) => {
          const blocked = (() => {
            if (res.status !== 403) {
              return false;
            }
            const resData: EngineServerIpBlockResponse = res.data;

            return resData.blocked && resData.reason === 'ip';
          })();

          return {
            blocked,
          };
        })
    );
  }

  /**
   * Retrieves current server epoch in milliseconds
   */
  async getTime(): Promise<GetEngineTimeResponse> {
    return axios.get(`${this.opts.url}/time`).then((res) => res.data);
  }
}
