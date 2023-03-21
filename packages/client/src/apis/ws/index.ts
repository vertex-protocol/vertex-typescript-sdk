import { Mixin } from 'ts-mixer';
import { WSExecuteAPI } from './WSExecuteAPI';
import { WSQueryAPI } from './WSQueryAPI';

export class WebsocketAPI extends Mixin(WSExecuteAPI, WSQueryAPI) {}
