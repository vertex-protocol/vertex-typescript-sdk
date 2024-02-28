import { EngineServerExecuteFailureResult } from './serverExecuteTypes';
import { EngineServerQueryFailureResponse } from './serverQueryTypes';

export class EngineServerFailureError extends Error {
  constructor(
    readonly responseData:
      | EngineServerQueryFailureResponse
      | EngineServerExecuteFailureResult,
  ) {
    super();
  }
}
