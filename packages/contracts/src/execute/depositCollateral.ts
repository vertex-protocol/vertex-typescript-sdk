import { WithContract } from '../common';

/**
 * Deposits collateral through the Endpoint contract, which will be picked up automatically by the sequencer and
 * submitted.
 *
 * TODO: Blocked by signing requirement
 */
export async function depositCollateral({
  endpoint,
}: WithContract<'endpoint', never>): Promise<void> {
  // TODO
}
