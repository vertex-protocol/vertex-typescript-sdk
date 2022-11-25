import { getBuiltGraphSDK, Sdk } from '../generated';

type GraphSDK = Sdk;

/**
 * Configuration options for Vertex graph client
 */
interface GraphClientOpts {
  // GraphQL endpoints
  endpoint: string;
  slimEndpoint: string;
}

export class BaseVertexGraphClient {
  readonly graph: GraphSDK;

  constructor(opts: GraphClientOpts) {
    this.graph = getBuiltGraphSDK({
      endpoint: opts.endpoint,
      slimEndpoint: opts.slimEndpoint,
    });
  }
}
