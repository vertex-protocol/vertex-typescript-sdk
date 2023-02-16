import { EngineWSSubscriptionClient } from './EngineWSSubscriptionClient';

async function main() {
  const wsClient = new EngineWSSubscriptionClient(
    'wss://test.vertexprotocol-backend.com',
  );

  wsClient.subscribeToStream({
    type: 'book_depth',
    product_id: 1,
  });
  const removeListener = wsClient.addMessageListener((msg) => {
    console.log('Listener message', msg);
  });

  wsClient.start();

  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log('Forcibly closing connection to test retries');
  wsClient.ws.close();

  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log('Removing listener');
  removeListener();

  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log('Shutting Down');
  wsClient.stop();
}

main().catch((e) => console.log(e));
