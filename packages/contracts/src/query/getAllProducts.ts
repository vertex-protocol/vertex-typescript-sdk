import { Product, WithContracts } from '../common';
import { mapContractPerpProduct, mapContractSpotProduct } from './utils';

export type GetAllProductsResponse = Product[];

/**
 * Return all products registered with the clearinghouse. Calls querier internally.
 */
export async function getAllProducts({
  querier,
}: WithContracts<unknown>): Promise<GetAllProductsResponse> {
  const contractData = await querier.read.getAllProducts();
  const products: Product[] = [];
  contractData.spotProducts.forEach((productInfo) => {
    products.push(mapContractSpotProduct(productInfo));
  });
  contractData.perpProducts.forEach((productInfo) => {
    products.push(mapContractPerpProduct(productInfo));
  });

  return products;
}
