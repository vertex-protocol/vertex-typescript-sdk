import { MarketWithProduct, ProductEngineType, WithContracts } from '../common';
import {
  mapEnginePerpProduct,
  mapEngineSpotProduct,
  mapQuerierMarket,
} from './utils';

export type GetAllMarketsResponse = MarketWithProduct[];

/**
 * Return all markets registered with the clearinghouse. Calls querier internally.
 * This also returns quote product with a zero market
 */
export async function getAllMarkets({
  querier,
}: WithContracts<unknown>): Promise<GetAllMarketsResponse> {
  const contractData = await querier.getAllProducts();
  const markets: MarketWithProduct[] = [];

  contractData.spotProducts.forEach((productInfo) => {
    markets.push({
      ...mapQuerierMarket(productInfo.market),
      type: ProductEngineType.SPOT,
      product: mapEngineSpotProduct(productInfo.productId, productInfo.product),
    });
  });

  contractData.perpProducts.forEach((productInfo) => {
    markets.push({
      ...mapQuerierMarket(productInfo.market),
      type: ProductEngineType.PERP,
      product: mapEnginePerpProduct(productInfo.productId, productInfo.product),
    });
  });

  return markets;
}
