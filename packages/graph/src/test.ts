import { getBuiltGraphSDK } from './generated';

const sdk = getBuiltGraphSDK();
sdk
  .PaginatedAllMarketOrdersQuery({
    filteredStatuses: ['INSTANT_FILL', 'ON_BOOK', 'CANCELLED', 'FILLED'],
    marketEntityId: '0x91039992300bc421af62d84d5cfd30bd1bb0f8fa-1-market',
    first: 10,
    // skip: 0,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
