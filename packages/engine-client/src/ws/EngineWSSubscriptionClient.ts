import WebSocket from 'ws';

export interface EngineSubscriptionFillParams {
  product_id: number;
  subaccount: string;
}

export interface EngineSubscriptionBookDepthParams {
  product_id: number;
}

export interface EngineSubscriptionParamsByType {
  fill: EngineSubscriptionFillParams;
  book_depth: EngineSubscriptionBookDepthParams;
}

export type EngineSubscriptionType = keyof EngineSubscriptionParamsByType;

export type EngineSubscriptionParams<T extends EngineSubscriptionType> = {
  type: T;
} & EngineSubscriptionParamsByType[T];

export interface EngineSubscriptionFillMessage {
  type: 'fill';
  // Nanoseconds
  timestamp: number;
  subaccount: string;
  order_digest: string;
  product_id: number;
  filled_qty: string;
  remaining_qty: string;
}

export interface EngineSubscriptionBookDepthMessage {
  type: 'book_depth';
  // book depth aggregates a number of events once per second
  // these are the minimum and maximum timestamps from
  // events that contributed to this response
  // nanoseconds
  min_timestamp: number;
  max_timestamp: number;
  product_id: number;
  // changes to the bid side of the book in the form of [[price, new_qty]]
  bids: [string, string][];
  // changes to the ask side of the book in the form of [[price, new_qty]]
  asks: [string, string][];
}

export type EngineSubscriptionMessage =
  | EngineSubscriptionBookDepthMessage
  | EngineSubscriptionFillMessage;

export type EngineSubscriptionListener = (
  message: EngineSubscriptionMessage,
) => void;

export class EngineWSSubscriptionClient {
  // Underlying websocket connection
  ws!: WebSocket;

  private readonly endpoint: string;
  // Whether connection is enabled, reconnection will be automatic if enabled
  private isEnabled = false;

  // A set of JSON subscription params as a cache for configured subscriptions
  private subscriptions = new Set<string>();

  // Listeners for parsed messages
  private lastListenerId = 0;
  private listeners: Record<number, EngineSubscriptionListener> = {};

  constructor(baseEngineWSEndpoint: string) {
    this.endpoint = `${baseEngineWSEndpoint}/subscribe`;
  }

  /**
   * Start the websocket connection and subscribe to any configured streams
   */
  start() {
    this.isEnabled = true;
    this.createNewWebSocket();
  }

  /**
   * Stop the websocket connection
   */
  stop(clearSubscriptions = false) {
    this.isEnabled = false;
    this.ws.close();
    if (clearSubscriptions) {
      this.subscriptions.clear();
    }
  }

  /**
   * Subscribe to a stream for the current WS connection and saves the params to re-subscribe in case of reconnection
   * @param params
   */
  subscribeToStream<T extends EngineSubscriptionType>(
    params: EngineSubscriptionParams<T>,
  ) {
    const streamJson = JSON.stringify(params);
    if (!this.subscriptions.has(streamJson)) {
      this.subscriptions.add(streamJson);
      this._subscribeToStream(params);
    }
  }

  /**
   * Unsubscribe to a stream corresponding to the given params, removes these params to prevent re-subscribing on reconnection
   *
   * @param params
   */
  unsubscribe<T extends EngineSubscriptionType>(
    params: EngineSubscriptionParams<T>,
  ) {
    this._unsubscribeFromStream(params);
    this.subscriptions.delete(JSON.stringify(params));
  }

  /**
   * Adds a listener for messages, returning an unsubscribe function
   *
   * @param listener
   */
  addMessageListener(listener: EngineSubscriptionListener) {
    const id = this.lastListenerId++;
    this.listeners[id] = listener;
    return () => {
      delete this.listeners[id];
    };
  }

  private _subscribeToStream(rawParams: unknown) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('Invalid state for subscription', this.ws?.readyState);
      return;
    }

    this.ws.send(
      JSON.stringify({
        method: 'subscribe',
        stream: rawParams,
        id: randomMessageId(),
      }),
    );
  }

  private _unsubscribeFromStream(rawParams: unknown) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('Invalid state for unsubscription', this.ws?.readyState);
      return;
    }

    this.ws.send(
      JSON.stringify({
        method: 'unsubscribe',
        stream: rawParams,
        id: randomMessageId(),
      }),
    );
  }

  private createNewWebSocket() {
    console.log('Creating new websocket connection to: ', this.endpoint);
    this.ws = new WebSocket(this.endpoint);
    this.ws.on('open', this.onConnectionOpened.bind(this));
    this.ws.on('close', this.onConnectionClosed.bind(this));
    this.ws.on('message', this.onMessage.bind(this));
    this.ws.on('error', this.onError.bind(this));
  }

  private onMessage(data: WebSocket.RawData) {
    const stringData = data.toString();
    console.log('Message received', stringData);
    this.notifyListenersIfNeeded(stringData);
  }

  private notifyListenersIfNeeded(rawData: string) {
    try {
      const parsedData = JSON.parse(rawData);
      Object.values(this.listeners).forEach((listener) => {
        listener(parsedData);
      });
    } catch (e) {
      console.error('Could not parse message JSON', rawData);
    }
  }

  private onConnectionOpened() {
    console.log('Connection opened');
    this.subscriptions.forEach((streamJson) => {
      this._subscribeToStream(JSON.parse(streamJson));
    });
  }

  private onConnectionClosed() {
    console.log('Connection closed');
    this.reconnectIfNeeded();
  }

  private onError(error: Error) {
    console.log('Connection error', error);
    this.reconnectIfNeeded();
  }

  private reconnectIfNeeded() {
    // Never initialized, create right away
    if (!this.ws) {
      this.createNewWebSocket();
      return;
    }
    if (
      !this.isEnabled ||
      this.ws.readyState === WebSocket.OPEN ||
      this.ws.readyState === WebSocket.CONNECTING
    ) {
      return;
    }
    // Retry connection after 1 second
    setTimeout(() => {
      // Do the connection status check again, a bit hacky but it works
      if (
        this.ws.readyState === WebSocket.CLOSED ||
        this.ws.readyState === WebSocket.CLOSING
      ) {
        this.createNewWebSocket();
      }
    }, 1000);
  }
}

function randomMessageId() {
  return Math.floor(Math.random() * 1e6);
}

/**
 * Improvements:
 * - Better retry mechanism, including configuration of retry intervals
 * - ping/pong listener for stale connections
 * - Check status of outgoing messages
 * - Add ability to listen to raw data
 */
