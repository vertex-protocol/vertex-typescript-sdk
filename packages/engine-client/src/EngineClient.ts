import { Mixin } from 'ts-mixer';
import { EngineExecuteClient } from './EngineExecuteClient';
import { EngineQueryClient } from './EngineQueryClient';
import { EngineWebClient } from './EngineWebClient';

export class EngineClient extends Mixin(
  EngineQueryClient,
  EngineExecuteClient,
  EngineWebClient,
) {}
