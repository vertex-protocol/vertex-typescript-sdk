import { getBuiltGraphSDK, Sdk } from '../generated';

type GraphSDK = Sdk;

/**
 * Configuration options for Vertex graph client
 */
export interface GraphClientOpts {
  // GraphQL endpoints
  coreEndpoint: string;
  marketsEndpoint: string;
  candlesticksEndpoint: string;
}

export class BaseVertexGraphClient {
  readonly graph: GraphSDK;

  constructor(opts: GraphClientOpts) {
    this.graph = getBuiltGraphSDK({
      coreEndpoint: opts.coreEndpoint,
      marketsEndpoint: opts.marketsEndpoint,
      candlesticksEndpoint: opts.candlesticksEndpoint,
    });
  }
}
