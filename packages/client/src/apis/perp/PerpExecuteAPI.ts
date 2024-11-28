import { BaseVertexAPI } from '../base';
import { SettlePnlParams } from '@vertex-protocol/contracts';

export class PerpExecuteAPI extends BaseVertexAPI {
  async settlePnl(_params: SettlePnlParams) {
    throw Error('Not implemented');
  }
}
