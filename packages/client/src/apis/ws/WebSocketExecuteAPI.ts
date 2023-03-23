import { EngineExecuteBuilder } from '@vertex-protocol/engine-client/dist/EngineExecuteBuilder';
import { VertexClientContext } from '../../context';

/**
 * @description Allows you to build execute payloads as expected by the server to send over Websocket.
 * @example vertexClient.ws.execute.buildPlaceOrderPayload(...)
 */
export class WebSocketExecuteAPI extends EngineExecuteBuilder {
  constructor(context: VertexClientContext) {
    super(context.engineClient);
  }
}
