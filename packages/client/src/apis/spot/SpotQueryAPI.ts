import {
  getAllProducts,
  isSpotProduct,
  SpotProduct,
} from '@vertex-protocol/contracts';
import { DepositParams } from './types';
import { Signer } from 'ethers';
import { toBigDecimal } from '@vertex-protocol/utils';
import { BaseSpotAPI } from './BaseSpotAPI';

export class SpotQueryAPI extends BaseSpotAPI {
  /**
   * Retrieves all spot product states from the on-chain contracts
   */
  async getAllSpotProducts(): Promise<SpotProduct[]> {
    const allProducts = await getAllProducts(this.context.contracts);
    return allProducts.filter(isSpotProduct);
  }

  /**
   * Determines if additional spend approval is required
   */
  async requiresDepositApproval(params: DepositParams): Promise<boolean> {
    const token = await this.getTokenContractForProduct(params.productId);
    // Force cast here
    const signer = this.context.chainSignerOrProvider as Signer;
    const allowance = await token.allowance(
      signer.getAddress(),
      this.context.contracts.endpoint.address,
    );
    return toBigDecimal(allowance).lt(toBigDecimal(params.amount));
  }
}
