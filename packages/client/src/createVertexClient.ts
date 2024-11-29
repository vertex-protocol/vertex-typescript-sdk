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
export function createVertexClient(
  opts: CreateVertexClientContextOpts,
  signerOpts: CreateVertexClientContextSignerOpts,
): VertexClient {
  return new VertexClient(createClientContext(opts, signerOpts));
}
