import { Mixin } from 'ts-mixer';
import { WebSocketExecuteAPI } from './WebSocketExecuteAPI';
import { WebSocketQueryAPI } from './WebSocketQueryAPI';

export class WebsocketAPI extends Mixin(
  WebSocketExecuteAPI,
  WebSocketQueryAPI,
) {}
