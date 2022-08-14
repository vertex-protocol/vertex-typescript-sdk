import { Product, WithContracts } from '../common';
import { mapEnginePerpProduct, mapEngineSpotProduct } from './utils';

export type GetAllProductsResponse = Product[];

export async function getAllProducts({
  querier,
}: WithContracts<unknown>): Promise<GetAllProductsResponse> {
  const contractData = await querier.getAllProducts();
  const products: Product[] = [];
  contractData.spotProducts.forEach((productInfo) => {
    products.push({
      productId: productInfo.productId,
      ...mapEngineSpotProduct(productInfo.product),
    });
  });
  contractData.perpProducts.forEach((productInfo) => {
    products.push({
      productId: productInfo.productId,
      ...mapEnginePerpProduct(productInfo.product),
    });
  });

  return products;
}
