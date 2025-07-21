import { Mixin } from 'ts-mixer';
import { EngineExecuteClient } from './EngineExecuteClient';
import { EngineQueryClient } from './EngineQueryClient';
import { EngineWebClient } from './EngineWebClient';

/**
 * Combined Engine client providing query, execution, and WebSocket functionality for off-chain matching engine communication
 */
export class EngineClient extends Mixin(
  EngineQueryClient,
  EngineExecuteClient,
  EngineWebClient,
) {}
