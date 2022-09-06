import { BaseVertexAPI } from '../base';
import {
  ApproveAllowanceParams,
  IERC20__factory,
  MintMockERC20Params,
  MockERC20__factory,
} from '@vertex-protocol/contracts';

export class SpotExecuteAPI extends BaseVertexAPI {
  async approveAllowance(params: ApproveAllowanceParams) {
    const spotProduct = await this.context.contracts.spotEngine.getProduct(
      params.productId,
    );
    const erc20 = await IERC20__factory.connect(
      spotProduct.config.token,
      this.context.signerOrProvider,
    );
    return erc20.approve(
      this.context.contracts.clearinghouse.address,
      params.amount,
    );
  }

  // TODO: deposit (optionally include approval) / withdraw collateral

  async _mintMockERC20(params: MintMockERC20Params) {
    const spotProduct = await this.context.contracts.spotEngine.getProduct(
      params.productId,
    );
    const erc20 = await MockERC20__factory.connect(
      spotProduct.config.token,
      this.context.signerOrProvider,
    );
    return erc20.mint(erc20.signer.getAddress(), params.amount);
  }
}
