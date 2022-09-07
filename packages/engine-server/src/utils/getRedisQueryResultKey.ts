import {
  RedisGetOrderQueryParams,
  RedisMarketLiquidityQueryParams,
  RedisMarketPriceQueryParams,
  RedisQueryRequestByType,
  RedisQueryRequestType,
  RedisSubaccountInfoQueryParams,
  RedisSubaccountOrdersQueryParams,
  RedisValidateOrderQueryParams,
} from '../types';

export function getRedisQueryResultKey<
  TRequestType extends RedisQueryRequestType,
>(
  requestType: TRequestType,
  params: RedisQueryRequestByType[TRequestType],
): string {
  const baseKey = `query_resp_${requestType}`;
  switch (requestType) {
    case 'subaccount_info':
      return `${baseKey}_${
        (params as RedisSubaccountInfoQueryParams).subaccount_id
      }`;
    case 'market_price':
      return `${baseKey}_${(params as RedisMarketPriceQueryParams).product_id}`;
    case 'order':
      return `${baseKey}_${getOrderResultIdentifier(
        params as RedisGetOrderQueryParams,
      )}`;
    case 'validate_order':
      return `${baseKey}_${getValidateOrderResultIdentifier(
        params as RedisValidateOrderQueryParams,
      )}`;
    case 'subaccount_orders':
      return `${baseKey}_${getSubaccountOrdersResultIdentifier(
        params as RedisSubaccountOrdersQueryParams,
      )}`;
    case 'market_liquidity':
      return `${baseKey}_${getMarketLiquidityResultIdentifier(
        params as RedisMarketLiquidityQueryParams,
      )}`;
  }
  throw Error(`Unknown request type: ${requestType}`);
}

function getOrderResultIdentifier(params: RedisGetOrderQueryParams) {
  return `${params.product_id}_${params.digest}`;
}

function getValidateOrderResultIdentifier(
  params: RedisValidateOrderQueryParams,
) {
  return `${params.product_id}_${params.order}`;
}

function getSubaccountOrdersResultIdentifier(
  params: RedisSubaccountOrdersQueryParams,
) {
  return `${params.subaccount_id}_${params.product_id}`;
}

function getMarketLiquidityResultIdentifier(
  params: RedisMarketLiquidityQueryParams,
) {
  return `${params.product_id}_${params.depth}`;
}
