import {
  approveDepositAllowance,
  depositCollateral,
  ExecuteDepositCollateralParams,
  MintMockERC20Params,
  MockERC20__factory,
} from '@vertex-protocol/contracts';
import { BaseSpotAPI, WithoutSender } from './BaseSpotAPI';
import { ApproveAllowanceParams } from './types';
import {
  EngineWithdrawCollateralParams,
  WithoutNonce,
} from '@vertex-protocol/engine-client';

export class SpotExecuteAPI extends BaseSpotAPI {
  async deposit(params: ExecuteDepositCollateralParams) {
    console.log(`endpoint: ${this.context.contracts.endpoint.address}`);
    return depositCollateral({
      endpoint: this.context.contracts.endpoint,
      subaccountName: params.subaccountName,
      productId: params.productId,
      amount: params.amount,
    });
  }

  async withdraw(
    params: WithoutSender<WithoutNonce<EngineWithdrawCollateralParams>>,
  ) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.withdrawCollateral({
      sender,
      endpointAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }

  async approveAllowance(params: ApproveAllowanceParams) {
    return approveDepositAllowance({
      amount: params.amount,
      endpoint: this.context.contracts.endpoint,
      tokenContract: await this.getTokenContractForProduct(params.productId),
    });
  }

  async _mintMockERC20(params: MintMockERC20Params) {
    const config = await this.context.contracts.spotEngine.getConfig(
      params.productId,
    );
    const erc20 = await MockERC20__factory.connect(
      config.token,
      this.context.chainSignerOrProvider,
    );
    return erc20.mint(erc20.signer.getAddress(), params.amount);
  }
}
