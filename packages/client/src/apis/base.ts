import { VertexClientContext } from '../context';
import { WithContracts } from '@vertex-protocol/contracts';
import { isSigner } from '../utils';

export class BaseVertexAPI {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
  }

  protected async getSignerAddress() {
    if (isSigner(this.context.signerOrProvider)) {
      return this.context.signerOrProvider.getAddress();
    }
    throw Error('Current context does not have a chain signer');
  }

  protected paramsWithContracts<T>(params: T): WithContracts<T> {
    return {
      ...params,
      ...this.context.contracts,
    };
  }
}
