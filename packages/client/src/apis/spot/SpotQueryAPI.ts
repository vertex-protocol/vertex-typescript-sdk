import {
  getAllProducts,
  isSpotProduct,
  SpotProduct,
} from '@vertex-protocol/contracts';
import { BigNumber, Signer } from 'ethers';
import { BaseSpotAPI } from './BaseSpotAPI';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';

export class SpotQueryAPI extends BaseSpotAPI {
  /**
   * Retrieves all spot product states from the on-chain contracts
   */
  async getAllSpotProducts(): Promise<SpotProduct[]> {
    const allProducts = await getAllProducts(this.context.contracts);
    return allProducts.filter(isSpotProduct);
  }

  /**
   * Helper to get current token balance in the user's wallet (i.e. not in a Vertex subaccount)
   */
  async getTokenWalletBalance(productId: number): Promise<BigNumber> {
    const token = await this.getTokenContractForProduct(productId);
    // Force cast here
    const signer = this.context.chainSignerOrProvider as Signer;
    return token.balanceOf(signer.getAddress());
  }

  /**
   * Helper to get current token allowance
   */
  async getTokenAllowance(productId: number): Promise<BigDecimal> {
    const token = await this.getTokenContractForProduct(productId);
    // Force cast here
    const signer = this.context.chainSignerOrProvider as Signer;
    return toBigDecimal(
      await token.allowance(
        signer.getAddress(),
        this.context.contracts.endpoint.address,
      ),
    );
  }
}
