import { EngineExecuteBuilder } from '@vertex-protocol/engine-client/dist/EngineExecuteBuilder';
import { VertexClientContext } from '../../context';

export class WebSocketExecuteAPI extends EngineExecuteBuilder {
  constructor(context: VertexClientContext) {
    super(context.engineClient);
  }
}
