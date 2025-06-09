export const STAKING_V2_SATELLITE_ABI = [
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'epoch',
        type: 'uint32',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'claim',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'epoch',
        type: 'uint32',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'claimAndStake',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'epoch',
            type: 'uint32',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalAmount',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct IAirdrop.ClaimProof[]',
        name: 'claimProofs',
        type: 'tuple[]',
      },
    ],
    name: 'claimMultiple',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'messageIds',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'epoch',
            type: 'uint32',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalAmount',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct IAirdrop.ClaimProof[]',
        name: 'claimProofs',
        type: 'tuple[]',
      },
    ],
    name: 'claimMultipleAndStake',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'messageIds',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimWithdraw',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
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
    name: 'estimateCcipGas',
    outputs: [
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
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
    ],
    name: 'stakeAs',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawSlow',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;
