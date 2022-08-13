import { BaseVertexAPI } from '../base';
import {
  getLiquidateSubaccountArgs,
  LiquidateSubaccountParams,
} from '@vertex/contracts';

export class SubaccountExecuteAPI extends BaseVertexAPI {
  async liquidateSubaccount(params: LiquidateSubaccountParams) {
    return this.context.contracts.clearinghouse.liquidateSubaccount(
      ...getLiquidateSubaccountArgs(params),
    );
  }
}
