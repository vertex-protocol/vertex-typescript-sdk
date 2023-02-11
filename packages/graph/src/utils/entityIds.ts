/**
 * Utils for creating Graph entity IDs
 * @packageDocumentation
 */

export function getSubaccountEntityId(owner: string, name: string) {
  // `owner` is a hex address, lowercased to standardize
  return `subaccount-${owner.toLowerCase()}-${name}`;
}

export function getProductEntityId(productId: number) {
  return `product-${productId}`;
}

export function getMarketEntityId(productId: number) {
  return getProductEntityId(productId).concat('-market');
}
