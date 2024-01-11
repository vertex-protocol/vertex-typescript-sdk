import { TriggerServerQueryFailureResponse } from './serverQueryTypes';
import { EngineServerExecuteFailureResult } from '@vertex-protocol/engine-client';

export class TriggerServerFailureError extends Error {
  constructor(
    readonly responseData:
      | TriggerServerQueryFailureResponse
      | EngineServerExecuteFailureResult,
  ) {
    super();
  }
}
