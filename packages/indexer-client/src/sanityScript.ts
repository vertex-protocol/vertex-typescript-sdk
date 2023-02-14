import { IndexerClient } from './IndexerClient';

async function main() {
  const client = new IndexerClient({
    url: 'https://test.vertexprotocol-backend.com/indexer',
  });

  const subaccountSummary = await client.getSubaccountSummary({
    subaccountOwner: '',
    subaccountName: 'default',
  });

  console.log(subaccountSummary);
}

main().catch((e) => console.log(e));
