import { VertexClient } from './client';
import {
  createClientContext,
  CreateVertexClientContextOpts,
  CreateVertexClientContextSignerOpts,
} from './context';

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
