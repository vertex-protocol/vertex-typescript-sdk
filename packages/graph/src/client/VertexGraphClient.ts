import { getBuiltGraphSDK, Sdk } from '../generated';

type GraphSDK = Sdk;

interface GraphClientOpts {
  endpoint?: string;
}

export class VertexGraphClient {
  readonly graph: GraphSDK;

  constructor(opts?: GraphClientOpts) {
    this.graph = getBuiltGraphSDK({ endpoint: opts?.endpoint });
  }

  getSubaccountsForAddress(address: string) {
    return this.graph.SubaccountsForAddress({
      address,
    });
  }
}
