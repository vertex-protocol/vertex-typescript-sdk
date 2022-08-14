import { BaseVertexAPI } from '../base';
import {
  ApproveAllowanceParams,
  getModifyCollateralArgs,
  IERC20__factory,
  MintMockERC20Params,
  MockERC20__factory,
  ModifyCollateralParams,
} from '@vertex-protocol/contracts';
import { BigNumber } from 'ethers';

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

  // By product ID, optionally also addresses allowance
  async modifyCollateral(
    params: ModifyCollateralParams & { includeApproval?: boolean },
  ) {
    if (params.includeApproval) {
      const productIdToApproveAmount: Record<string, BigNumber> = {};
      params.operations.forEach((op) => {
        const amount = BigNumber.from(op.amount);
        if (amount.lte(0)) {
          return;
        }

        const productIdStr = op.productId.toString();
        const existingAmount = productIdToApproveAmount[productIdStr];

        if (!existingAmount) {
          productIdToApproveAmount[productIdStr] = amount;
        } else {
          productIdToApproveAmount[productIdStr] = existingAmount.add(amount);
        }
      });

      const approvePromises = Object.keys(productIdToApproveAmount).map(
        (productIdStr) => {
          return this.approveAllowance({
            productId: productIdStr,
            amount: productIdToApproveAmount[productIdStr],
          });
        },
      );
      await Promise.all(approvePromises);
    }

    return this.context.contracts.clearinghouse.modifyCollateral(
      ...getModifyCollateralArgs(params),
    );
  }

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
