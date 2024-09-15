import { Chain, createClient } from 'viem';
import { Config, createConfig, CreateConnectorFn, http } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { WagmiConfigParams } from '../types';

/**
 * Creates client required for wagmi context
 */
export function getWagmiConfig(params: WagmiConfigParams): Config {
  const connectorFns: CreateConnectorFn[] = params.connectorOptions
    ? [
        injected(),
        walletConnect(params.connectorOptions.walletConnect),
        coinbaseWallet({
          version: '4',
          ...params.connectorOptions.coinbase,
        }),
      ]
    : [];

  return createConfig({
    chains: params.supportedChains as unknown as readonly [Chain, ...Chain[]],
    connectors: connectorFns,
    client({ chain }) {
      return createClient({ chain, transport: http() });
    },
    storage: params.storage,
    ssr: true,
  });
}
