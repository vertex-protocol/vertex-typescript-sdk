export const SPOT_ENGINE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
    ],
    name: 'AddProduct',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
          },
          {
            internalType: 'bytes32',
            name: 'subaccount',
            type: 'bytes32',
          },
          {
            internalType: 'int128',
            name: 'amountDelta',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'vQuoteDelta',
            type: 'int128',
          },
        ],
        internalType: 'struct IProductEngine.ProductDelta[]',
        name: 'deltas',
        type: 'tuple[]',
      },
    ],
    name: 'applyDeltas',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
      {
        internalType: 'int128',
        name: 'amountLp',
        type: 'int128',
      },
    ],
    name: 'burnLp',
    outputs: [
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'liquidatee',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'liquidator',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'feeCalculator',
        type: 'address',
      },
    ],
    name: 'decomposeLps',
    outputs: [
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'getBalance',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'amount',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeMultiplierX18',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.Balance',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'getBalanceAmount',
    outputs: [
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'getBalances',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'amount',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.LpBalance',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'amount',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeMultiplierX18',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.Balance',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getClearinghouse',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
    ],
    name: 'getConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'int128',
            name: 'interestInflectionUtilX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'interestFloorX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'interestSmallCapX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'interestLargeCapX18',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.Config',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEngineType',
    outputs: [
      {
        internalType: 'enum IProductEngine.EngineType',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
    ],
    name: 'getLpState',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'supply',
            type: 'int128',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'amount',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lastCumulativeMultiplierX18',
                type: 'int128',
              },
            ],
            internalType: 'struct ISpotEngine.Balance',
            name: 'quote',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'amount',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lastCumulativeMultiplierX18',
                type: 'int128',
              },
            ],
            internalType: 'struct ISpotEngine.Balance',
            name: 'base',
            type: 'tuple',
          },
        ],
        internalType: 'struct ISpotEngine.LpState',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
    ],
    name: 'getOrderbook',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProductIds',
    outputs: [
      {
        internalType: 'uint32[]',
        name: '',
        type: 'uint32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'getStateAndBalance',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'cumulativeDepositsMultiplierX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeBorrowsMultiplierX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'totalDepositsNormalized',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'totalBorrowsNormalized',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.State',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'amount',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeMultiplierX18',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.Balance',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'getStatesAndBalances',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'supply',
            type: 'int128',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'amount',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lastCumulativeMultiplierX18',
                type: 'int128',
              },
            ],
            internalType: 'struct ISpotEngine.Balance',
            name: 'quote',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'amount',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lastCumulativeMultiplierX18',
                type: 'int128',
              },
            ],
            internalType: 'struct ISpotEngine.Balance',
            name: 'base',
            type: 'tuple',
          },
        ],
        internalType: 'struct ISpotEngine.LpState',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'amount',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.LpBalance',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'cumulativeDepositsMultiplierX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeBorrowsMultiplierX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'totalDepositsNormalized',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'totalBorrowsNormalized',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.State',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'amount',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeMultiplierX18',
            type: 'int128',
          },
        ],
        internalType: 'struct ISpotEngine.Balance',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
    ],
    name: 'getWithdrawFee',
    outputs: [
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'hasBalance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_clearinghouse',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_quote',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_endpoint',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_fees',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'int128[]',
        name: 'totalDeposits',
        type: 'int128[]',
      },
      {
        internalType: 'int128[]',
        name: 'totalBorrows',
        type: 'int128[]',
      },
    ],
    name: 'manualAssert',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
      {
        internalType: 'int128',
        name: 'amountBase',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: 'quoteAmountLow',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: 'quoteAmountHigh',
        type: 'int128',
      },
    ],
    name: 'mintLp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'socializeSubaccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'int128',
        name: 'baseDelta',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: 'quoteDelta',
        type: 'int128',
      },
    ],
    name: 'swapLp',
    outputs: [
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'int128',
        name: 'amount',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: 'priceX18',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: 'sizeIncrement',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: 'lpSpreadX18',
        type: 'int128',
      },
    ],
    name: 'swapLp',
    outputs: [
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'txn',
        type: 'bytes',
      },
    ],
    name: 'updateProduct',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'dt',
        type: 'uint128',
      },
    ],
    name: 'updateStates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
