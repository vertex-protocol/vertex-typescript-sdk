import {
  IndexerEvent,
  IndexerEventWithTx,
  IndexerOrder,
  IndexerPerpBalance,
  IndexerServerBalance,
  IndexerServerEvent,
  IndexerServerOrder,
  IndexerServerProduct,
  IndexerServerTx,
  IndexerSpotBalance,
} from './types';
import { fromX18, toBigDecimal } from '@vertex-protocol/utils';
import {
  Market,
  parseRawExpirationTimestamp,
  PerpMarket,
  ProductEngineType,
  SpotMarket,
} from '@vertex-protocol/contracts';
import {
  getRecvTimeFromOrderNonce,
  mapEngineServerPerpProduct,
  mapEngineServerSpotProduct,
} from '@vertex-protocol/engine-client';

export function mapIndexerServerProduct(product: IndexerServerProduct): Market {
  if ('spot' in product) {
    return mapEngineServerSpotProduct(product.spot);
  }
  return mapEngineServerPerpProduct(product.perp);
}

export function mapIndexerServerBalance(
  balance: IndexerServerBalance,
): IndexerSpotBalance | IndexerPerpBalance {
  if ('spot' in balance) {
    return {
      amount: toBigDecimal(balance.spot.balance.amount),
      lpAmount: toBigDecimal(balance.spot.lp_balance.amount),
      productId: balance.spot.product_id,
      type: ProductEngineType.SPOT,
    };
  }
  return {
    amount: toBigDecimal(balance.perp.balance.amount),
    lpAmount: toBigDecimal(balance.perp.lp_balance.amount),
    productId: balance.perp.product_id,
    type: ProductEngineType.PERP,
    vQuoteBalance: toBigDecimal(balance.perp.balance.v_quote_balance),
  };
}

export function mapIndexerOrder(order: IndexerServerOrder): IndexerOrder {
  const expiration = toBigDecimal(order.expiration);
  const expirationEncodedData = parseRawExpirationTimestamp(order.expiration);
  return {
    amount: toBigDecimal(order.amount),
    digest: order.digest,
    rawExpiration: expiration,
    expiration: expirationEncodedData.expiration,
    orderType: expirationEncodedData.type,
    nonce: toBigDecimal(order.nonce),
    recvTimeSeconds: getRecvTimeFromOrderNonce(order.nonce) / 1000,
    price: fromX18(order.price_x18),
    productId: order.product_id,
    subaccount: order.subaccount,
    submissionIndex: order.submission_idx,
    baseFilled: toBigDecimal(order.base_filled),
    quoteFilled: toBigDecimal(order.quote_filled),
    fee: toBigDecimal(order.fee),
  };
}

export function mapIndexerEvent(event: IndexerServerEvent): IndexerEvent {
  const eventState: IndexerEvent['state'] = (() => {
    // Assume backend data is consistent
    if ('spot' in event.pre_balance) {
      return {
        type: ProductEngineType.SPOT,
        market: mapIndexerServerProduct(event.product) as SpotMarket,
        preBalance: mapIndexerServerBalance(
          event.pre_balance,
        ) as IndexerSpotBalance,
        postBalance: mapIndexerServerBalance(
          event.post_balance,
        ) as IndexerSpotBalance,
      };
    }
    return {
      type: ProductEngineType.PERP,
      market: mapIndexerServerProduct(event.product) as PerpMarket,
      preBalance: mapIndexerServerBalance(
        event.pre_balance,
      ) as IndexerPerpBalance,
      postBalance: mapIndexerServerBalance(
        event.post_balance,
      ) as IndexerPerpBalance,
    };
  })();

  return {
    eventType: event.event_type,
    productId: event.product_id,
    state: eventState,
    subaccount: event.subaccount,
    submissionIndex: event.submission_idx,
    trackedVars: {
      netEntryCumulative: toBigDecimal(event.net_entry_cumulative),
      netEntryLpCumulative: toBigDecimal(event.net_entry_lp_cumulative),
      netEntryLpUnrealized: toBigDecimal(event.net_entry_lp_unrealized),
      netEntryUnrealized: toBigDecimal(event.net_entry_unrealized),
      netFundingCumulative: toBigDecimal(event.net_funding_cumulative),
      netFundingUnrealized: toBigDecimal(event.net_funding_unrealized),
      netInterestCumulative: toBigDecimal(event.net_interest_cumulative),
      netInterestUnrealized: toBigDecimal(event.net_interest_unrealized),
    },
  };
}

export function mapIndexerEventWithTx(
  event: IndexerServerEvent,
  tx: IndexerServerTx,
): IndexerEventWithTx {
  return {
    timestamp: toBigDecimal(tx.timestamp),
    ...mapIndexerEvent(event),
  };
}
