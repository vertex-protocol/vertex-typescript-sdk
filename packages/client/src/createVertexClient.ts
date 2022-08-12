import { createClientContext, VertexClientContextOpts } from './context';
import { VertexClient } from './client';

export async function createVertexClient(
  opts: VertexClientContextOpts,
): Promise<VertexClient> {
  return new VertexClient(await createClientContext(opts));
}
