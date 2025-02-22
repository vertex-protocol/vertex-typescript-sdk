import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineServerIpBlockResponse,
  GetEngineIpBlockStatusResponse,
  GetEngineTimeResponse,
} from './types';

/**
 * Queries that talk directly to web, _not_ the engine. Placing here in the `engine-client` as we don't have enough
 * use cases to justify a separate package
 */
export class EngineWebClient extends EngineBaseClient {
  /**
   * Determines the IP block status for the current client
   */
  async getIpBlockStatus(): Promise<GetEngineIpBlockStatusResponse> {
    return (
      this.axiosInstance
        // Use the /time endpoint and listen to 403 responses
        .get(`${this.opts.url}/ip`, {
          // Allow all statuses
          validateStatus: () => true,
          // IP checks go through Cloudflare, which uses allow-origin as *, so withCredentials needs to be false
          withCredentials: false,
        })
        .then((res) => {
          if (res.status !== 403) {
            return null;
          }
          const resData = res.data as EngineServerIpBlockResponse;

          if (!resData.blocked) {
            return null;
          }

          return resData.reason === 'ip_query_only' ? 'query_only' : 'blocked';
        })
    );
  }

  /**
   * Determines whether a client needs to complete the cloudflare JS challenge to interact with the API
   *
   * @return true if the client needs to complete the JS challenge at '/challenge', false otherwise
   */
  async getRequiresCloudflareAuth(): Promise<boolean> {
    // We use a generic endpoint and check for the CF challenge header
    // Note: this uses a CORS set to the relevant frontend endpoint (ex. testnet.vertexprotocol.com) so it will NOT
    // work from other domains
    return this.axiosInstance
      .get(`${this.opts.url}/cf-check`, {
        // Allow all statuses
        validateStatus: () => true,
      })
      .then((res) => {
        if (res.status !== 403) {
          return false;
        }

        return res.headers['cf-mitigated'] === 'challenge';
      });
  }

  /**
   * Retrieves current server epoch in milliseconds
   */
  async getTime(): Promise<GetEngineTimeResponse> {
    return this.axiosInstance
      .get(`${this.opts.url}/time`)
      .then((res) => res.data as GetEngineTimeResponse);
  }
}
