import { getBuiltGraphSDK } from '../generated';

const sdk = getBuiltGraphSDK();
sdk
  .SubaccountsForAddress({
    address: '0x3c06e307BA6Ab81E8Ff6661c1559ce8027744AE5',
  })
  .then((res) => {
    console.log('hello');
    console.log(res);
  });
