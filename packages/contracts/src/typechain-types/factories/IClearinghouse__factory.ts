/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IClearinghouse,
  IClearinghouseInterface,
} from "../IClearinghouse";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "endpoint",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fees",
        type: "address",
      },
    ],
    name: "ClearinghouseInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "liquidatorSubaccount",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "liquidateeSubaccount",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "mode",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "healthGroup",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "amount",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "amountQuote",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "insuranceCover",
        type: "int128",
      },
    ],
    name: "Liquidation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int128",
        name: "amount",
        type: "int128",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "subaccount",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "ModifyCollateral",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "engine",
        type: "address",
      },
      {
        internalType: "enum IProductEngine.EngineType",
        name: "engineType",
        type: "uint8",
      },
    ],
    name: "addEngine",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct IEndpoint.BurnLp",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "burnLp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEndpoint.DepositCollateral",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "depositCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEndpoint.DepositInsurance",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "depositInsurance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEndpoint",
    outputs: [
      {
        internalType: "address",
        name: "endpoint",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "getEngineByProduct",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IProductEngine.EngineType",
        name: "engineType",
        type: "uint8",
      },
    ],
    name: "getEngineByType",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "subaccount",
        type: "bytes32",
      },
      {
        internalType: "enum IProductEngine.HealthType",
        name: "healthType",
        type: "uint8",
      },
    ],
    name: "getHealth",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHealthGroups",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "spotId",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "perpId",
            type: "uint32",
          },
        ],
        internalType: "struct IClearinghouseState.HealthGroup[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInsurance",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumProducts",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "getOraclePriceX18",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "healthGroup",
        type: "uint32",
      },
    ],
    name: "getOraclePricesX18",
    outputs: [
      {
        components: [
          {
            internalType: "int128",
            name: "spotPriceX18",
            type: "int128",
          },
          {
            internalType: "int128",
            name: "perpPriceX18",
            type: "int128",
          },
        ],
        internalType: "struct IEndpoint.Prices",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "getOrderbook",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getQuote",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "getRisk",
    outputs: [
      {
        components: [
          {
            internalType: "int128",
            name: "longWeightInitialX18",
            type: "int128",
          },
          {
            internalType: "int128",
            name: "shortWeightInitialX18",
            type: "int128",
          },
          {
            internalType: "int128",
            name: "longWeightMaintenanceX18",
            type: "int128",
          },
          {
            internalType: "int128",
            name: "shortWeightMaintenanceX18",
            type: "int128",
          },
          {
            internalType: "int128",
            name: "largePositionPenaltyX18",
            type: "int128",
          },
        ],
        internalType: "struct RiskHelper.Risk",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSupportedEngines",
    outputs: [
      {
        internalType: "enum IProductEngine.EngineType[]",
        name: "",
        type: "uint8[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVersion",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "liquidatee",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "mode",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "healthGroup",
            type: "uint32",
          },
          {
            internalType: "int128",
            name: "amount",
            type: "int128",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct IEndpoint.LiquidateSubaccount",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "liquidateSubaccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "uint128",
            name: "amountBase",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "quoteAmountLow",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "quoteAmountHigh",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct IEndpoint.MintLp",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "mintLp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "longWeightInitial",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "shortWeightInitial",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "longWeightMaintenance",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "shortWeightMaintenance",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "largePositionPenalty",
            type: "int32",
          },
        ],
        internalType: "struct IClearinghouseState.RiskStore",
        name: "riskStore",
        type: "tuple",
      },
    ],
    name: "modifyProductConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32[]",
            name: "subaccounts",
            type: "bytes32[]",
          },
          {
            internalType: "int128[]",
            name: "amounts",
            type: "int128[]",
          },
        ],
        internalType: "struct IEndpoint.Rebate",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "rebate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "book",
        type: "address",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "longWeightInitial",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "shortWeightInitial",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "longWeightMaintenance",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "shortWeightMaintenance",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "largePositionPenalty",
            type: "int32",
          },
        ],
        internalType: "struct IClearinghouseState.RiskStore",
        name: "riskStore",
        type: "tuple",
      },
      {
        internalType: "uint32",
        name: "healthGroup",
        type: "uint32",
      },
    ],
    name: "registerProductForId",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32[]",
            name: "subaccounts",
            type: "bytes32[]",
          },
          {
            internalType: "uint256[]",
            name: "productIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct IEndpoint.SettlePnl",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "settlePnl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct IEndpoint.WithdrawCollateral",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "withdrawCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IClearinghouse__factory {
  static readonly abi = _abi;
  static createInterface(): IClearinghouseInterface {
    return new utils.Interface(_abi) as IClearinghouseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IClearinghouse {
    return new Contract(address, _abi, signerOrProvider) as IClearinghouse;
  }
}
