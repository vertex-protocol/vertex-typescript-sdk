export const PERP_ENGINE_ABI = [
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
            name: 'vQuoteBalance',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.Balance',
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
          {
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.LpBalance',
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
            name: 'vQuoteBalance',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.Balance',
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
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeFundingPerLpX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'base',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'quote',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.LpState',
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
    name: 'getPositionPnl',
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
    name: 'getSettlementState',
    outputs: [
      {
        internalType: 'int128',
        name: 'availableSettle',
        type: 'int128',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'supply',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeFundingPerLpX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'base',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'quote',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.LpState',
        name: 'lpState',
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
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.LpBalance',
        name: 'lpBalance',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'cumulativeFundingLongX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeFundingShortX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'availableSettle',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'openInterest',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.State',
        name: 'state',
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
            name: 'vQuoteBalance',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.Balance',
        name: 'balance',
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
    name: 'getStateAndBalance',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'cumulativeFundingLongX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeFundingShortX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'availableSettle',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'openInterest',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.State',
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
            name: 'vQuoteBalance',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.Balance',
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
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeFundingPerLpX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'base',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'quote',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.LpState',
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
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.LpBalance',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'cumulativeFundingLongX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'cumulativeFundingShortX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'availableSettle',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'openInterest',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.State',
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
            name: 'vQuoteBalance',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lastCumulativeFundingX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpEngine.Balance',
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
        name: 'openInterests',
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
      {
        internalType: 'uint256',
        name: 'productIds',
        type: 'uint256',
      },
    ],
    name: 'settlePnl',
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
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
      {
        internalType: 'int128',
        name: 'insurance',
        type: 'int128',
      },
    ],
    name: 'socializeSubaccount',
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
      {
        internalType: 'int128[]',
        name: 'avgPriceDiffs',
        type: 'int128[]',
      },
    ],
    name: 'updateStates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
