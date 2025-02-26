import {
  approveDepositAllowance,
  depositCollateral,
  DepositCollateralParams,
  MintMockERC20Params,
} from '@vertex-protocol/contracts';
import { MOCK_ERC20_ABI } from '@vertex-protocol/contracts/dist/common/abis/MockERC20';
import { toBigInt } from '@vertex-protocol/utils';
import { BaseSpotAPI } from './BaseSpotAPI';
import { ApproveAllowanceParams, WithdrawCollateralParams } from './types';

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
      subaccountOwner: this.getSubaccountOwnerIfNeeded(params),
      chainId: this.getWalletClientChainIdIfNeeded(params),
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
    const config = await this.context.contracts.spotEngine.read.getConfig([
      params.productId,
    ]);
    return this.context.walletClient.writeContract({
      abi: MOCK_ERC20_ABI,
      address: config.token,
      functionName: 'mint',
      args: [this.getWalletClientAddress(), toBigInt(params.amount)],
    });
  }
}
