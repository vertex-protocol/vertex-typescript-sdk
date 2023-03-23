import { VertexClientContext } from '../../context';
import { BaseVertexAPI } from '../base';
import { WebSocketExecuteAPI } from './WebSocketExecuteAPI';
import { WebSocketQueryAPI } from './WebSocketQueryAPI';

/**
 * @description Allows you to build payloads as expected by the server to send over Websocket.
 */
export class WebsocketAPI extends BaseVertexAPI {
  readonly query: WebSocketQueryAPI;
  readonly execute: WebSocketExecuteAPI;

  constructor(context: VertexClientContext) {
    super(context);
    this.query = new WebSocketQueryAPI(context);
    this.execute = new WebSocketExecuteAPI(context);
  }
}
