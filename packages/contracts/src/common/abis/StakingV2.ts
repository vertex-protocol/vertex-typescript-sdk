export const STAKING_V2_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'ConnectTradingWallet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int128',
        name: 'vrtxDelta',
        type: 'int128',
      },
      {
        indexed: false,
        internalType: 'int128',
        name: 'liquidDelta',
        type: 'int128',
      },
    ],
    name: 'ModifyStake',
    type: 'event',
  },
  {
    inputs: [],
    name: 'claimWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'connectTradingWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'withdrawLockingTime',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'minimumStakingPeriod',
            type: 'uint64',
          },
          {
            internalType: 'uint128',
            name: 'toDistributeRatio',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'toTreasuryRatio',
            type: 'uint128',
          },
        ],
        internalType: 'struct IStakingV2.Config',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDefaultConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'withdrawLockingTime',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'minimumStakingPeriod',
            type: 'uint64',
          },
          {
            internalType: 'uint128',
            name: 'toDistributeRatio',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'toTreasuryRatio',
            type: 'uint128',
          },
        ],
        internalType: 'struct IStakingV2.Config',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGlobalYieldsBreakdown',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'distributionTime',
            type: 'uint64',
          },
          {
            internalType: 'uint128',
            name: 'baseYieldAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'feesYieldAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'totalVrtxBalance',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'usdcAmount',
            type: 'uint128',
          },
        ],
        internalType: 'struct IStakingV2.GlobalYieldsBreakdown[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getLastActionTimes',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'lastStakeTime',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'lastWithdrawTime',
            type: 'uint64',
          },
        ],
        internalType: 'struct IStakingV2.LastActionTimes',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMigrationBonusPool',
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
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getReleaseSchedule',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'releaseTime',
            type: 'uint64',
          },
          {
            internalType: 'uint128',
            name: 'amount',
            type: 'uint128',
          },
        ],
        internalType: 'struct IStakingV2.ReleaseSchedule',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getState',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'cumulativeStakedAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'cumulativeWithdrawnAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'cumulativeBurnedAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'currentStakedAmount',
            type: 'uint128',
          },
        ],
        internalType: 'struct IStakingV2.State',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalVrtxBalance',
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
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getTradingWallet',
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
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getVrtxBalance',
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
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getWithdrawableTime',
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
        internalType: 'address',
        name: 'staker',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'bonus',
        type: 'uint128',
      },
    ],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'staker',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
    ],
    name: 'stakeAs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawSlow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
