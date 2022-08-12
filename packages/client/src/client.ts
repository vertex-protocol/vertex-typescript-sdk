import { VertexClientContext } from './context';

export class VertexClient {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
  }
}
