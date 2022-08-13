import { VertexClientContext } from '../context';
import { WithContracts } from '@vertex/contracts';

export class BaseVertexAPI {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
  }

  protected paramsWithContracts<T>(params: T): WithContracts<T> {
    return {
      ...params,
      ...this.context.contracts,
    };
  }
}
