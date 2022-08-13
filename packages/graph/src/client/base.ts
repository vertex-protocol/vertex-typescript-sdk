import { getBuiltGraphSDK, Sdk } from '../generated';

type GraphSDK = Sdk;

interface GraphClientOpts {
  endpoint?: string;
}

export class BaseVertexGraphClient {
  readonly graph: GraphSDK;

  constructor(opts?: GraphClientOpts) {
    this.graph = getBuiltGraphSDK({ endpoint: opts?.endpoint });
  }

  // TODO: determine if the orders can do conditional filtering
}
