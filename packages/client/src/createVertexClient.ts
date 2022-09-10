import {
  createClientContext,
  CreateVertexClientContextOpts,
  CreateVertexClientContextSignerOpts,
} from './context';
import { VertexClient } from './client';

/**
 * Creates a Vertex client from given options.
 * {@label CLIENT}
 *
 * @param opts
 * @param signerOpts
 */
export async function createVertexClient(
  opts: CreateVertexClientContextOpts,
  signerOpts: CreateVertexClientContextSignerOpts,
): Promise<VertexClient> {
  return new VertexClient(await createClientContext(opts, signerOpts));
}
