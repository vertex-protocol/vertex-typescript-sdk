import {
  approveDepositAllowance,
  depositCollateral,
  DepositCollateralParams,
  MintMockERC20Params,
  MockERC20__factory,
} from '@vertex-protocol/contracts';
import { BaseSpotAPI } from './BaseSpotAPI';
import { ApproveAllowanceParams, WithdrawCollateralParams } from './types';
import { toBigInt } from '@vertex-protocol/utils';

export class SpotExecuteAPI extends BaseSpotAPI {
  async deposit(params: DepositCollateralParams) {
    return depositCollateral({
      endpoint: this.context.contracts.endpoint,
      subaccountName: params.subaccountName,
      productId: params.productId,
      amount: params.amount,
      referralCode: params.referralCode,
    });
  }

  async withdraw(params: WithdrawCollateralParams) {
    return this.context.engineClient.withdrawCollateral({
      ...params,
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      chainId: await this.getSignerChainIdIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
    });
  }

  async approveAllowance(params: ApproveAllowanceParams) {
    return approveDepositAllowance({
      amount: params.amount,
      endpoint: this.context.contracts.endpoint,
      tokenContract: await this.getTokenContractForProduct(params),
    });
  }

  async _mintMockERC20(params: MintMockERC20Params) {
    const config = await this.context.contracts.spotEngine.getConfig(
      params.productId,
    );
    const erc20 = MockERC20__factory.connect(
      config.token,
      this.context.signerOrProvider,
    );
    return erc20.mint(
      await this.getChainSignerAddress(),
      toBigInt(params.amount),
    );
  }
}
