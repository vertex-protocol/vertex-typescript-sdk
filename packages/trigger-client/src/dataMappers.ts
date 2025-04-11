import {
  addDecimals,
  removeDecimals,
  toBigDecimal,
  toIntegerString,
} from '@vertex-protocol/utils';
import {
  TriggerCriteria,
  TriggerOrder,
  TriggerOrderInfo,
  TriggerOrderStatus,
  TriggerServerOrderInfo,
  TriggerServerOrderStatus,
  TriggerServerTriggerCriteria,
} from './types';

export function mapTriggerServerOrderStatus(
  status: TriggerServerOrderStatus,
): TriggerOrderStatus {
  if (status === 'pending') {
    return {
      type: 'pending',
    };
  } else if ('cancelled' in status) {
    return {
      type: 'cancelled',
      reason: status.cancelled,
    };
  } else if ('internal_error' in status) {
    return {
      type: 'internal_error',
      error: status.internal_error,
    };
  } else if ('triggered' in status) {
    return {
      type: 'triggered',
      result: status.triggered,
    };
  }
  throw Error(`Unknown trigger order status: ${JSON.stringify(status)}`);
}

export function mapTriggerCriteria(
  criteria: TriggerCriteria,
): TriggerServerTriggerCriteria {
  const priceValue = toIntegerString(
    addDecimals(toBigDecimal(criteria.triggerPrice)),
  );
  switch (criteria.type) {
    case 'oracle_price_above':
      return { price_above: priceValue };
    case 'oracle_price_below':
      return { price_below: priceValue };
    case 'last_price_above':
      return { last_price_above: priceValue };
    case 'last_price_below':
      return { last_price_below: priceValue };
  }
}

export function mapServerTriggerCriteria(
  criteria: TriggerServerTriggerCriteria,
): TriggerCriteria {
  if ('price_above' in criteria) {
    return {
      type: 'oracle_price_above',
      triggerPrice: removeDecimals(toBigDecimal(criteria.price_above)),
    };
  }
  if ('price_below' in criteria) {
    return {
      type: 'oracle_price_below',
      triggerPrice: removeDecimals(toBigDecimal(criteria.price_below)),
    };
  }
  if ('last_price_above' in criteria) {
    return {
      type: 'last_price_above',
      triggerPrice: removeDecimals(toBigDecimal(criteria.last_price_above)),
    };
  }
  return {
    type: 'last_price_below',
    triggerPrice: removeDecimals(toBigDecimal(criteria.last_price_below)),
  };
}

export function mapServerOrderInfo(
  info: TriggerServerOrderInfo,
): TriggerOrderInfo {
  const { order: serverOrder, status, updated_at } = info;
  const order: TriggerOrder = {
    amount: toBigDecimal(serverOrder.order.amount),
    expiration: toBigDecimal(serverOrder.order.expiration),
    nonce: serverOrder.order.nonce,
    price: removeDecimals(toBigDecimal(serverOrder.order.priceX18)),
    digest: serverOrder.digest,
    productId: serverOrder.product_id,
    triggerCriteria: mapServerTriggerCriteria(serverOrder.trigger),
  };
  return {
    serverOrder,
    order,
    status: mapTriggerServerOrderStatus(status),
    updatedAt: updated_at,
  };
}
