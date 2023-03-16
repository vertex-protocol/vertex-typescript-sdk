import { ProductEngineType } from '@vertex-protocol/contracts';

export type NetworkName = 'testnet' | 'mainnet';

export interface ProductMetadata {
  type: string;
  name: string;
  symbol: string;
  token?: string;
}

const BTC_PERP_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.PERP],
  name: 'BTC-PERP',
  symbol: 'BTC',
};

const ETH_PERP_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.PERP],
  name: 'ETH-PERP',
  symbol: 'ETH',
};

const USDC_ARB_GOERLI_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.SPOT],
  name: 'USDC',
  symbol: 'USDC',
  token: '0x179522635726710dd7d2035a81d856de4aa7836c',
};

const WBTC_ARB_GOERLI_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.SPOT],
  name: 'wBTC',
  symbol: 'wBTC',
  token: '0x5cc7c91690b2cbaee19a513473d73403e13fb431',
};

const WETH_ARB_GOERLI_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.SPOT],
  name: 'wETH',
  symbol: 'wETH',
  token: '0xcc59686e3a32fb104c8ff84dd895676265efb8a6',
};

const USDC_ARB_ONE_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.SPOT],
  name: 'USDC',
  symbol: 'USDC',
  token: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
};

const WBTC_ARB_ONE_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.SPOT],
  name: 'wBTC',
  symbol: 'wBTC',
  token: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
};

const WETH_ARB_ONE_METADATA: ProductMetadata = {
  type: ProductEngineType[ProductEngineType.SPOT],
  name: 'wETH',
  symbol: 'wETH',
  token: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
};

export const ARB_GOERLI_METADATA_BY_PRODUCT_ID: Record<
  number,
  ProductMetadata
> = {
  0: USDC_ARB_GOERLI_METADATA,
  1: WBTC_ARB_GOERLI_METADATA,
  2: BTC_PERP_METADATA,
  3: WETH_ARB_GOERLI_METADATA,
  4: ETH_PERP_METADATA,
};

export const ARB_ONE_METADATA_BY_PRODUCT_ID: Record<number, ProductMetadata> = {
  0: USDC_ARB_ONE_METADATA,
  1: WBTC_ARB_ONE_METADATA,
  2: BTC_PERP_METADATA,
  3: WETH_ARB_ONE_METADATA,
  4: ETH_PERP_METADATA,
};

/**
 * Retrieves the product's metadata on a provided network by productId
 * @param network testnet | mainnet
 * @param productId Id of product to retrieve metadata for.
 * @returns a ProductMetadata obj.
 * @throws an error if an invalid product is provided.
 */
export const getProductMetadataByProductId = (
  network: NetworkName,
  productId: number,
): ProductMetadata => {
  if (productId < 0 || productId > 4) {
    throw Error('invalid productId provided');
  }
  switch (network) {
    case 'testnet':
      return ARB_GOERLI_METADATA_BY_PRODUCT_ID[productId];
    case 'mainnet':
      return ARB_ONE_METADATA_BY_PRODUCT_ID[productId];
  }
};
