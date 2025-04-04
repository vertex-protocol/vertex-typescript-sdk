export const ENDPOINT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'SubmitTransactions',
    type: 'event',
  },
  {
    inputs: [],
    name: 'clearinghouse',
    outputs: [
      {
        internalType: 'contract IClearinghouse',
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
        internalType: 'bytes12',
        name: 'subaccountName',
        type: 'bytes12',
      },
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
    ],
    name: 'depositCollateral',
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
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        internalType: 'string',
        name: 'referralCode',
        type: 'string',
      },
    ],
    name: 'depositCollateralWithReferral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes12',
        name: 'subaccountName',
        type: 'bytes12',
      },
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        internalType: 'string',
        name: 'referralCode',
        type: 'string',
      },
    ],
    name: 'depositCollateralWithReferral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'count',
        type: 'uint32',
      },
    ],
    name: 'executeSlowModeTransactions',
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
    ],
    name: 'getBook',
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
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'getNonce',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
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
    name: 'getPriceX18',
    outputs: [
      {
        internalType: 'int128',
        name: 'priceX18',
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
        name: 'healthGroup',
        type: 'uint32',
      },
    ],
    name: 'getPricesX18',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'spotPriceX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'perpPriceX18',
            type: 'int128',
          },
        ],
        internalType: 'struct IEndpoint.Prices',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSequencer',
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
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
    ],
    name: 'getSubaccountId',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTime',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getVersion',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sanctions',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_sequencer',
        type: 'address',
      },
      {
        internalType: 'contract IClearinghouse',
        name: '_clearinghouse',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: 'slowModeTimeout',
        type: 'uint64',
      },
      {
        internalType: 'uint128',
        name: '_time',
        type: 'uint128',
      },
      {
        internalType: 'int128[]',
        name: '_prices',
        type: 'int128[]',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nSubmissions',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
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
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'transaction',
        type: 'bytes',
      },
    ],
    name: 'processSlowModeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'referralCodes',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'transferable',
        type: 'bool',
      },
    ],
    name: 'registerTransferableWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
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
    name: 'requireSubaccount',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    name: 'sequencerFee',
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
    name: 'sequencerFees',
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
        internalType: 'address',
        name: 'book',
        type: 'address',
      },
    ],
    name: 'setBook',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sequencer',
        type: 'address',
      },
    ],
    name: 'setSequencer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slowModeConfig',
    outputs: [
      {
        internalType: 'uint64',
        name: 'timeout',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'txCount',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'txUpTo',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    name: 'slowModeTxs',
    outputs: [
      {
        internalType: 'uint64',
        name: 'executableAt',
        type: 'uint64',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'tx',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'transaction',
        type: 'bytes',
      },
    ],
    name: 'submitSlowModeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'transactions',
        type: 'bytes[]',
      },
    ],
    name: 'submitTransactions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'idx',
        type: 'uint64',
      },
      {
        internalType: 'bytes[]',
        name: 'transactions',
        type: 'bytes[]',
      },
    ],
    name: 'submitTransactionsChecked',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'idx',
        type: 'uint64',
      },
      {
        internalType: 'bytes[]',
        name: 'transactions',
        type: 'bytes[]',
      },
      {
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'submitTransactionsCheckedWithGasLimit',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
