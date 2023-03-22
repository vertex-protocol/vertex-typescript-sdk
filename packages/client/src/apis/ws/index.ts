import { VertexClientContext } from '../../context';
import { BaseVertexAPI } from '../base';
import { WebSocketExecuteAPI } from './WebSocketExecuteAPI';
import { WebSocketQueryAPI } from './WebSocketQueryAPI';

export class WebsocketAPI extends BaseVertexAPI {
  readonly query: WebSocketQueryAPI;
  readonly execute: WebSocketExecuteAPI;

  constructor(context: VertexClientContext) {
    super(context);
    this.query = new WebSocketQueryAPI(context);
    this.execute = new WebSocketExecuteAPI(context);
  }
}
