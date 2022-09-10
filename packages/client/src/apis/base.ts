import { VertexClientContext } from '../context';
import { WithContracts } from '@vertex-protocol/contracts';

export class BaseVertexAPI {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
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
