import { BaseVertexAPI } from '../base';
import {
  ApproveAllowanceParams,
  DepositCollateralParams,
  IERC20__factory,
  MintMockERC20Params,
  MockERC20__factory,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';

export class SpotExecuteAPI extends BaseVertexAPI {
  async deposit(params: Omit<DepositCollateralParams, 'sender'>) {
    const sender = await this.getEngineSigner().getAddress();

    return this.context.engineClient.depositCollateral({
      sender,
      endpointAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }

  async withdraw(params: Omit<WithdrawCollateralParams, 'sender'>) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.withdrawCollateral({
      sender,
      endpointAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }

  async approveAllowance(params: ApproveAllowanceParams) {
    const spotProduct = await this.context.contracts.spotEngine.getProduct(
      params.productId,
    );
    const erc20 = await IERC20__factory.connect(
      spotProduct.config.token,
      this.context.chainSignerOrProvider,
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
      this.context.chainSignerOrProvider,
    );
    return erc20.mint(erc20.signer.getAddress(), params.amount);
  }
}
