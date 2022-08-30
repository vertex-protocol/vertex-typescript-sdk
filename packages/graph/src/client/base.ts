import { getBuiltGraphSDK, Sdk } from '../generated';

type GraphSDK = Sdk;

/**
 * Configuration options for Vertex graph client
 */
interface GraphClientOpts {
  // GraphQL endpoint
  endpoint: string;
}

export class BaseVertexGraphClient {
  readonly graph: GraphSDK;

  constructor(opts: GraphClientOpts) {
    this.graph = getBuiltGraphSDK({ endpoint: opts.endpoint });
  }
}
