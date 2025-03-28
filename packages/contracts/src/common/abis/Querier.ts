export const QUERIER_ABI = [
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'x',
        type: 'int256',
      },
    ],
    name: 'PRBMathSD59x18__SqrtNegativeInput',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'x',
        type: 'int256',
      },
    ],
    name: 'PRBMathSD59x18__SqrtOverflow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'getAllProducts',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint32',
                name: 'productId',
                type: 'uint32',
              },
              {
                internalType: 'int128',
                name: 'oraclePriceX18',
                type: 'int128',
              },
              {
                components: [
                  {
                    internalType: 'int128',
                    name: 'longWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'longWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'largePositionPenaltyX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct RiskHelper.Risk',
                name: 'risk',
                type: 'tuple',
              },
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
                name: 'config',
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
                name: 'state',
                type: 'tuple',
              },
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
                name: 'lpState',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'int128',
                    name: 'sizeIncrement',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'priceIncrementX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'minSize',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'collectedFees',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'lpSpreadX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct FQuerier.BookInfo',
                name: 'bookInfo',
                type: 'tuple',
              },
            ],
            internalType: 'struct FQuerier.SpotProduct[]',
            name: 'spotProducts',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'productId',
                type: 'uint32',
              },
              {
                internalType: 'int128',
                name: 'oraclePriceX18',
                type: 'int128',
              },
              {
                components: [
                  {
                    internalType: 'int128',
                    name: 'longWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'longWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'largePositionPenaltyX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct RiskHelper.Risk',
                name: 'risk',
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
                    name: 'sizeIncrement',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'priceIncrementX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'minSize',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'collectedFees',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'lpSpreadX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct FQuerier.BookInfo',
                name: 'bookInfo',
                type: 'tuple',
              },
            ],
            internalType: 'struct FQuerier.PerpProduct[]',
            name: 'perpProducts',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct FQuerier.ProductInfo',
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
        internalType: 'contract IProductEngine',
        name: 'engine',
        type: 'address',
      },
    ],
    name: 'getBookInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'sizeIncrement',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'priceIncrementX18',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'minSize',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'collectedFees',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'lpSpreadX18',
            type: 'int128',
          },
        ],
        internalType: 'struct FQuerier.BookInfo',
        name: 'bookInfo',
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
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
    ],
    name: 'getPerpBalance',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
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
        internalType: 'struct FQuerier.PerpBalance',
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
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
      {
        internalType: 'uint32[]',
        name: 'productIds',
        type: 'uint32[]',
      },
    ],
    name: 'getPerpBalances',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
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
        internalType: 'struct FQuerier.PerpBalance[]',
        name: 'perpBalances',
        type: 'tuple[]',
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
    name: 'getPerpProduct',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
          },
          {
            internalType: 'int128',
            name: 'oraclePriceX18',
            type: 'int128',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'longWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'longWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'largePositionPenaltyX18',
                type: 'int128',
              },
            ],
            internalType: 'struct RiskHelper.Risk',
            name: 'risk',
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
                name: 'sizeIncrement',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'priceIncrementX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'minSize',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'collectedFees',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lpSpreadX18',
                type: 'int128',
              },
            ],
            internalType: 'struct FQuerier.BookInfo',
            name: 'bookInfo',
            type: 'tuple',
          },
        ],
        internalType: 'struct FQuerier.PerpProduct',
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
        internalType: 'uint32[]',
        name: 'productIds',
        type: 'uint32[]',
      },
    ],
    name: 'getPerpProducts',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
          },
          {
            internalType: 'int128',
            name: 'oraclePriceX18',
            type: 'int128',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'longWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'longWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'largePositionPenaltyX18',
                type: 'int128',
              },
            ],
            internalType: 'struct RiskHelper.Risk',
            name: 'risk',
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
                name: 'sizeIncrement',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'priceIncrementX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'minSize',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'collectedFees',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lpSpreadX18',
                type: 'int128',
              },
            ],
            internalType: 'struct FQuerier.BookInfo',
            name: 'bookInfo',
            type: 'tuple',
          },
        ],
        internalType: 'struct FQuerier.PerpProduct[]',
        name: 'perpProducts',
        type: 'tuple[]',
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
      {
        internalType: 'uint32',
        name: 'productId',
        type: 'uint32',
      },
    ],
    name: 'getSpotBalance',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
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
            name: 'lpBalance',
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
            name: 'balance',
            type: 'tuple',
          },
        ],
        internalType: 'struct FQuerier.SpotBalance',
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
        internalType: 'bytes32',
        name: 'subaccount',
        type: 'bytes32',
      },
      {
        internalType: 'uint32[]',
        name: 'productIds',
        type: 'uint32[]',
      },
    ],
    name: 'getSpotBalances',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
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
            name: 'lpBalance',
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
            name: 'balance',
            type: 'tuple',
          },
        ],
        internalType: 'struct FQuerier.SpotBalance[]',
        name: 'spotBalances',
        type: 'tuple[]',
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
    name: 'getSpotProduct',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
          },
          {
            internalType: 'int128',
            name: 'oraclePriceX18',
            type: 'int128',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'longWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'longWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'largePositionPenaltyX18',
                type: 'int128',
              },
            ],
            internalType: 'struct RiskHelper.Risk',
            name: 'risk',
            type: 'tuple',
          },
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
            name: 'config',
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
            name: 'state',
            type: 'tuple',
          },
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
            name: 'lpState',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'sizeIncrement',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'priceIncrementX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'minSize',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'collectedFees',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lpSpreadX18',
                type: 'int128',
              },
            ],
            internalType: 'struct FQuerier.BookInfo',
            name: 'bookInfo',
            type: 'tuple',
          },
        ],
        internalType: 'struct FQuerier.SpotProduct',
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
        internalType: 'uint32[]',
        name: 'productIds',
        type: 'uint32[]',
      },
    ],
    name: 'getSpotProducts',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'productId',
            type: 'uint32',
          },
          {
            internalType: 'int128',
            name: 'oraclePriceX18',
            type: 'int128',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'longWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightInitialX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'longWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortWeightMaintenanceX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'largePositionPenaltyX18',
                type: 'int128',
              },
            ],
            internalType: 'struct RiskHelper.Risk',
            name: 'risk',
            type: 'tuple',
          },
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
            name: 'config',
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
            name: 'state',
            type: 'tuple',
          },
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
            name: 'lpState',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'sizeIncrement',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'priceIncrementX18',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'minSize',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'collectedFees',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'lpSpreadX18',
                type: 'int128',
              },
            ],
            internalType: 'struct FQuerier.BookInfo',
            name: 'bookInfo',
            type: 'tuple',
          },
        ],
        internalType: 'struct FQuerier.SpotProduct[]',
        name: 'spotProducts',
        type: 'tuple[]',
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
    name: 'getSubaccountInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'subaccount',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'assets',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'liabilities',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'health',
                type: 'int128',
              },
            ],
            internalType: 'struct FQuerier.HealthInfo[]',
            name: 'healths',
            type: 'tuple[]',
          },
          {
            internalType: 'int128[][]',
            name: 'healthContributions',
            type: 'int128[][]',
          },
          {
            internalType: 'uint32',
            name: 'spotCount',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'perpCount',
            type: 'uint32',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'productId',
                type: 'uint32',
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
                name: 'lpBalance',
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
                name: 'balance',
                type: 'tuple',
              },
            ],
            internalType: 'struct FQuerier.SpotBalance[]',
            name: 'spotBalances',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'productId',
                type: 'uint32',
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
            internalType: 'struct FQuerier.PerpBalance[]',
            name: 'perpBalances',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'productId',
                type: 'uint32',
              },
              {
                internalType: 'int128',
                name: 'oraclePriceX18',
                type: 'int128',
              },
              {
                components: [
                  {
                    internalType: 'int128',
                    name: 'longWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'longWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'largePositionPenaltyX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct RiskHelper.Risk',
                name: 'risk',
                type: 'tuple',
              },
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
                name: 'config',
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
                name: 'state',
                type: 'tuple',
              },
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
                name: 'lpState',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'int128',
                    name: 'sizeIncrement',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'priceIncrementX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'minSize',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'collectedFees',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'lpSpreadX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct FQuerier.BookInfo',
                name: 'bookInfo',
                type: 'tuple',
              },
            ],
            internalType: 'struct FQuerier.SpotProduct[]',
            name: 'spotProducts',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'productId',
                type: 'uint32',
              },
              {
                internalType: 'int128',
                name: 'oraclePriceX18',
                type: 'int128',
              },
              {
                components: [
                  {
                    internalType: 'int128',
                    name: 'longWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightInitialX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'longWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'shortWeightMaintenanceX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'largePositionPenaltyX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct RiskHelper.Risk',
                name: 'risk',
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
                    name: 'sizeIncrement',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'priceIncrementX18',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'minSize',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'collectedFees',
                    type: 'int128',
                  },
                  {
                    internalType: 'int128',
                    name: 'lpSpreadX18',
                    type: 'int128',
                  },
                ],
                internalType: 'struct FQuerier.BookInfo',
                name: 'bookInfo',
                type: 'tuple',
              },
            ],
            internalType: 'struct FQuerier.PerpProduct[]',
            name: 'perpProducts',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct FQuerier.SubaccountInfo',
        name: '',
        type: 'tuple',
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
        name: '_clearinghouse',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
