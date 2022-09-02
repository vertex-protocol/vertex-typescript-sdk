import { createClientContext, CreateVertexClientContextOpts } from './context';
import { VertexClient } from './client';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';

/**
 * Creates a Vertex client from given options.
 * {@label CLIENT}
 *
 * @param opts
 * @param signerOrProvider
 */
export async function createVertexClient(
  opts: CreateVertexClientContextOpts,
  signerOrProvider: Signer | Provider,
): Promise<VertexClient> {
  return new VertexClient(await createClientContext(opts, signerOrProvider));
}
