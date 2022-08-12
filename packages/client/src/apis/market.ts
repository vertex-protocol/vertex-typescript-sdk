import { VertexClientContext } from '../context';

export class MarketAPI {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
  }
}
