import { EthereumProviderOptions } from '@walletconnect/ethereum-provider';
import type { Storage as WagmiStorage } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { CoinbaseWalletParameters } from 'wagmi/connectors';

export interface WagmiConnectorOptions {
  walletConnect: Required<
    Pick<EthereumProviderOptions, 'projectId' | 'metadata'>
  >;
  coinbase: CoinbaseWalletParameters<'4'>;
}

export interface WagmiConfigParams {
  supportedChains: Chain[];
  storage?: WagmiStorage;
  // If not given, connectors are not initialized. This is useful for read-only apps
  connectorOptions?: WagmiConnectorOptions;
}
