import { VertexClientContext } from '../context';
import { WithContracts } from '@vertex-protocol/contracts';
import { isSigner } from '../utils';

export class BaseVertexAPI {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
  }

  protected async getChainSigner() {
    if (isSigner(this.context.signerOrProvider)) {
      return this.context.signerOrProvider;
    }
    throw Error('Current context does not have a chain signer');
  }

  protected async getChainSignerAddress() {
    return (await this.getChainSigner()).getAddress();
  }

  protected paramsWithContracts<T>(params: T): WithContracts<T> {
    return {
      ...params,
      ...this.context.contracts,
    };
  }
}
