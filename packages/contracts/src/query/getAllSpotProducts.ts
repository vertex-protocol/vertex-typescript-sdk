import { SpotProduct, WithContracts } from '../common';
import { mapEngineSpotProduct } from './utils';

export type GetAllSpotProductsResponse = SpotProduct[];

export async function getAllSpotProducts({
  querier,
}: WithContracts<unknown>): Promise<GetAllSpotProductsResponse> {
  const contractData = await querier.getAllProducts();
  return contractData.spotProducts.map((productInfo) => {
    return {
      productId: productInfo.productId,
      ...mapEngineSpotProduct(productInfo.product),
    };
  });
}
