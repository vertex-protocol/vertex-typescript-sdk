import { Mixin } from 'ts-mixer';
import { VertexClientContext } from '../../context';
import { WebSocketExecuteAPI } from './WebSocketExecuteAPI';
import { WebSocketQueryAPI } from './WebSocketQueryAPI';

export class WebsocketAPI {
  readonly context: VertexClientContext;
  readonly query: WebSocketQueryAPI;
  readonly execute: WebSocketExecuteAPI;

  constructor(context: VertexClientContext) {
    this.context = context;
    this.query = new WebSocketQueryAPI(context);
    this.execute = new WebSocketExecuteAPI(context);
  }
}
