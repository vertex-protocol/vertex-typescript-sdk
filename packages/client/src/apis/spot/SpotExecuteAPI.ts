import { BaseVertexAPI } from '../base';
import {
  getModifyCollateralArgs,
  ModifyCollateralParams,
} from '@vertex-protocol/contracts';

export class SpotExecuteAPI extends BaseVertexAPI {
  // By product ID
  async increaseTokenAllowance() {
    console.log('hi eslint');
  }

  // By product ID, optionally also addresses allowance
  async modifyCollateral(
    params: ModifyCollateralParams & { includeApproval?: boolean },
  ) {
    // TODO allowance
    if (params.includeApproval) {
      // Get sum of all operations that are positive
      // this.increaseTokenAllowance();
    }

    return this.context.contracts.clearinghouse.modifyCollateral(
      ...getModifyCollateralArgs(params),
    );
  }

  // By product ID
  async _mintMockERC20() {
    console.log('hi eslint');
  }
}
