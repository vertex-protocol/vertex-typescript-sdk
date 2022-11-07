import { MarketWithProduct, ProductEngineType, WithContracts } from '../common';
import { mapEnginePerpProduct, mapEngineSpotProduct } from './utils';
import { fromX18, toBigDecimal } from '@vertex-protocol/utils';

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
      productId: productInfo.productId,
      type: ProductEngineType.SPOT,
      product: mapEngineSpotProduct(productInfo),
      priceIncrement: fromX18(productInfo.bookInfo.priceIncrementX18),
      sizeIncrement: toBigDecimal(productInfo.bookInfo.sizeIncrement),
    });
  });

  contractData.perpProducts.forEach((productInfo) => {
    markets.push({
      productId: productInfo.productId,
      type: ProductEngineType.PERP,
      product: mapEnginePerpProduct(productInfo),
      priceIncrement: fromX18(productInfo.bookInfo.priceIncrementX18),
      sizeIncrement: toBigDecimal(productInfo.bookInfo.sizeIncrement),
    });
  });

  return markets;
}
