import { BaseVertexAPI } from '../base';

export class SpotExecuteAPI extends BaseVertexAPI {
  // By product ID
  async increaseTokenAllowance() {
    console.log('hi eslint');
  }

  // By product ID, optionally also addresses allowance
  async modifyCollateral() {
    console.log('hi eslint');
  }

  // By product ID
  async _mintMockERC20() {
    console.log('hi eslint');
  }
}
