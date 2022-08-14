import { BaseVertexAPI } from '../base';
import { getSettlePnlArgs, SettlePnlParams } from '@vertex/contracts';

export class PerpExecuteAPI extends BaseVertexAPI {
  async settlePnl(params: SettlePnlParams) {
    return this.context.contracts.clearinghouse.settlePnl(
      ...getSettlePnlArgs(params),
    );
  }
}
