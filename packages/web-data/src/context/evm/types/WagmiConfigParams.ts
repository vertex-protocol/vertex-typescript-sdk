import { EthereumProviderOptions } from '@walletconnect/ethereum-provider';
import { Chain } from 'viem';
import { CoinbaseWalletParameters } from 'wagmi/connectors';

export interface WagmiConnectorOptions {
  walletConnect: Required<
    Pick<EthereumProviderOptions, 'projectId' | 'metadata'>
  >;
  coinbase: Pick<CoinbaseWalletParameters, 'appName'>;
}

export interface WagmiConfigParams {
  supportedChains: Chain[];
  // If not given, connectors are not initialized. This is useful for read-only apps
  connectorOptions?: WagmiConnectorOptions;
}
