import { Mixin } from 'ts-mixer';
import { EngineExecuteClient } from './EngineExecuteClient';
import { EngineQueryClient } from './EngineQueryClient';

export class EngineClient extends Mixin(
  EngineQueryClient,
  EngineExecuteClient,
) {}
