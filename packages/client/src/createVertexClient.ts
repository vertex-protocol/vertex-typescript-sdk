import { VertexClient } from './client';
import {
  createClientContext,
  CreateVertexClientContextAccountOpts,
  CreateVertexClientContextOpts,
} from './context';

/**
 * Creates a Vertex client from given options.
 * {@label CLIENT}
 *
 * @param opts
 * @param accountOpts
 */
export function createVertexClient(
  opts: CreateVertexClientContextOpts,
  accountOpts: CreateVertexClientContextAccountOpts,
): VertexClient {
  return new VertexClient(createClientContext(opts, accountOpts));
}
