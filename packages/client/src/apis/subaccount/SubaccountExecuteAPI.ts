import { BaseVertexAPI } from '../base';
import {
  getLiquidateSubaccountArgs,
  LiquidateSubaccountParams,
} from '@vertex-protocol/contracts';

export class SubaccountExecuteAPI extends BaseVertexAPI {
  /**
   * Liquidates a subaccount
   *
   * @param params
   */
  async liquidateSubaccount(params: LiquidateSubaccountParams) {
    return this.context.contracts.clearinghouse.liquidateSubaccount(
      ...getLiquidateSubaccountArgs(params),
    );
  }
}
