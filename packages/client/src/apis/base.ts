import { VertexClientContext } from '../context';
import { WithContracts } from '@vertex-protocol/contracts';
import { ExecuteResultKey } from '@vertex-protocol/engine-client';

export class BaseVertexAPI {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
  }

  async getEngineExecuteResult(resultKey: ExecuteResultKey) {
    return this.context.engineClient.getExecuteResult(resultKey);
  }

  protected getEngineSigner() {
    const signer = this.context.engineSigner;
    if (!signer) {
      throw Error('No engine signer');
    }
    return signer;
  }

  protected paramsWithContracts<T>(params: T): WithContracts<T> {
    return {
      ...params,
      ...this.context.contracts,
    };
  }
}
