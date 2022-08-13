import { getBuiltGraphSDK, Sdk } from '../generated';

type GraphSDK = Sdk;

interface GraphClientOpts {
  endpoint?: string;
}

export interface GetSubaccountsParams {
  address: string;
}

export class VertexGraphClient {
  readonly graph: GraphSDK;

  constructor(opts?: GraphClientOpts) {
    this.graph = getBuiltGraphSDK({ endpoint: opts?.endpoint });
  }

  getSubaccountsForAddress(params: GetSubaccountsParams) {
    return this.graph.SubaccountsForAddress({ address: params.address });
  }
}
