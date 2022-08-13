import { MarketWithProduct, ProductEngineType, WithContracts } from '../common';
import {
  mapEnginePerpProduct,
  mapEngineSpotProduct,
  mapQuerierMarket,
} from './utils';

export type GetAllMarketsResponse = MarketWithProduct[];

export async function getAllMarkets({
  querier,
}: WithContracts<unknown>): Promise<GetAllMarketsResponse> {
  const contractData = await querier.getAllProducts();
  const markets: MarketWithProduct[] = [];

  contractData.spotProducts.forEach((productInfo) => {
    markets.push({
      productId: productInfo.productId,
      product: mapEngineSpotProduct(productInfo.product),
      ...mapQuerierMarket(productInfo.market),
      // This makes TS happy
      type: ProductEngineType.SPOT,
    });
  });

  contractData.perpProducts.forEach((productInfo) => {
    markets.push({
      productId: productInfo.productId,
      product: mapEnginePerpProduct(productInfo.product),
      ...mapQuerierMarket(productInfo.market),
      type: ProductEngineType.PERP,
    });
  });

  return markets;
}
