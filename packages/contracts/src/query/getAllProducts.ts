import { Product, WithContracts } from '../common';
import { mapEnginePerpProduct, mapEngineSpotProduct } from './utils';

export type GetAllProductsResponse = Product[];

/**
 * Return all products registered with the clearinghouse. Calls querier internally.
 */
export async function getAllProducts({
  querier,
}: WithContracts<unknown>): Promise<GetAllProductsResponse> {
  const contractData = await querier.getAllProducts();
  const products: Product[] = [];
  contractData.spotProducts.forEach((productInfo) => {
    products.push(
      mapEngineSpotProduct(productInfo.productId, productInfo.product),
    );
  });
  contractData.perpProducts.forEach((productInfo) => {
    products.push(
      mapEnginePerpProduct(productInfo.productId, productInfo.product),
    );
  });

  return products;
}
