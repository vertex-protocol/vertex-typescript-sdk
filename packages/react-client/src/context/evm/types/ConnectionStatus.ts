import { JsonRpcSigner } from 'ethers';
import { Connector } from 'wagmi';

/**
 * All possible connection states
 */
export type ConnectionStatus =
  | {
      type: 'initializing' | 'disconnected' | 'reconnecting' | 'connecting';
      address: string | undefined;
      signer: JsonRpcSigner | undefined;
      connector: Connector | undefined;
    }
  | {
      type: 'connected';
      address: string;
      signer: JsonRpcSigner | undefined;
      connector: Connector;
    };
