import {
  approveDepositAllowance,
  depositCollateral,
  ExecuteDepositCollateralParams,
  MintMockERC20Params,
  MockERC20__factory,
} from '@vertex-protocol/contracts';
import { BaseSpotAPI } from './BaseSpotAPI';
import {
  ExecuteApproveAllowanceParams,
  ExecuteWithdrawCollateralParams,
} from './types';

export class SpotExecuteAPI extends BaseSpotAPI {
  async deposit(params: ExecuteDepositCollateralParams) {
    return depositCollateral({
      endpoint: this.context.contracts.endpoint,
      subaccountName: params.subaccountName,
      productId: params.productId,
      amount: params.amount,
      referralCode: params.referralCode,
    });
  }

  async withdraw(params: ExecuteWithdrawCollateralParams) {
    return this.context.engineClient.withdrawCollateral({
      ...params,
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      chainId: await this.getSignerChainIdIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
    });
  }

  async approveAllowance(params: ExecuteApproveAllowanceParams) {
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
    const erc20 = await MockERC20__factory.connect(
      config.token,
      this.context.signerOrProvider,
    );
    return erc20.mint(await this.getChainSignerAddress(), params.amount);
  }
}
