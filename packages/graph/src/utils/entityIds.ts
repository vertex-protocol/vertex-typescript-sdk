/**
 * Utils for creating Graph entity IDs
 * @packageDocumentation
 */

export function getSubaccountEntityId(owner: string, name: string) {
  return `subaccount-${owner}-${name}`;
}

export function getProductEntityId(productId: number) {
  return `product-${productId}`;
}

export function getMarketEntityId(productId: number) {
  return getProductEntityId(productId).concat('-market');
}
