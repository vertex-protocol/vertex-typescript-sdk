/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IPerpEngine, IPerpEngineInterface } from "../IPerpEngine";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "AddProduct",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "ProductUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "subaccount",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
    ],
    name: "SettlePnl",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "socializedQuote",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "socializedBase",
        type: "int256",
      },
    ],
    name: "SocializeProduct",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "subaccountId",
            type: "uint64",
          },
          {
            internalType: "int256",
            name: "amountDeltaX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "vQuoteDeltaX18",
            type: "int256",
          },
        ],
        internalType: "struct IProductEngine.ProductDelta[]",
        name: "deltas",
        type: "tuple[]",
      },
    ],
    name: "applyDeltas",
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
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
    ],
    name: "getBalanceAmountX18",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "enum IProductEngine.HealthType",
        name: "healthType",
        type: "uint8",
      },
      {
        internalType: "int256",
        name: "amountDeltaX18",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "vQuoteDeltaX18",
        type: "int256",
      },
    ],
    name: "getBalanceHealthWithDeltaX18",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "enum IProductEngine.HealthType",
        name: "healthType",
        type: "uint8",
      },
    ],
    name: "getBalanceHealthX18",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClearinghouse",
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
    name: "getEngineType",
    outputs: [
      {
        internalType: "enum IProductEngine.EngineType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
      {
        internalType: "enum IProductEngine.HealthType",
        name: "healthType",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "int256",
            name: "amountDeltaX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "vQuoteDeltaX18",
            type: "int256",
          },
        ],
        internalType: "struct IProductEngine.HealthDelta[]",
        name: "healthDeltas",
        type: "tuple[]",
      },
    ],
    name: "getHealthWithDeltasX18",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
      {
        internalType: "enum IProductEngine.HealthType",
        name: "healthType",
        type: "uint8",
      },
    ],
    name: "getHealthX18",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
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
      {
        internalType: "int256",
        name: "amountX18",
        type: "int256",
      },
    ],
    name: "getLiqPriceX18",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "int256",
        name: "healthAmountX18",
        type: "int256",
      },
    ],
    name: "getMaximumLiquidatableX18",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
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
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "getProduct",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "int256",
                name: "longWeightInitialX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "shortWeightInitialX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "longWeightMaintenanceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "shortWeightMaintenanceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "largePositionPenaltyX18",
                type: "int256",
              },
            ],
            internalType: "struct IPerpEngine.Config",
            name: "config",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "int256",
                name: "priceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "emaPriceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "cumulativeFundingLongX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "cumulativeFundingShortX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "openInterestX18",
                type: "int256",
              },
              {
                internalType: "uint256",
                name: "fundingLastUpdated",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "emaPriceLastUpdated",
                type: "uint256",
              },
              {
                internalType: "int256",
                name: "availableSettleX18",
                type: "int256",
              },
            ],
            internalType: "struct IPerpEngine.State",
            name: "state",
            type: "tuple",
          },
        ],
        internalType: "struct IPerpEngine.Product",
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
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
    ],
    name: "getProductAndBalance",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "int256",
                name: "longWeightInitialX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "shortWeightInitialX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "longWeightMaintenanceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "shortWeightMaintenanceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "largePositionPenaltyX18",
                type: "int256",
              },
            ],
            internalType: "struct IPerpEngine.Config",
            name: "config",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "int256",
                name: "priceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "emaPriceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "cumulativeFundingLongX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "cumulativeFundingShortX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "openInterestX18",
                type: "int256",
              },
              {
                internalType: "uint256",
                name: "fundingLastUpdated",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "emaPriceLastUpdated",
                type: "uint256",
              },
              {
                internalType: "int256",
                name: "availableSettleX18",
                type: "int256",
              },
            ],
            internalType: "struct IPerpEngine.State",
            name: "state",
            type: "tuple",
          },
        ],
        internalType: "struct IPerpEngine.Product",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "amountX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "vQuoteBalanceX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "lastCumulativeFundingX18",
            type: "int256",
          },
        ],
        internalType: "struct IPerpEngine.Balance",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProductIds",
    outputs: [
      {
        internalType: "uint32[]",
        name: "",
        type: "uint32[]",
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
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
    ],
    name: "getSettlementState",
    outputs: [
      {
        internalType: "int256",
        name: "availableSettleX18",
        type: "int256",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "int256",
                name: "longWeightInitialX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "shortWeightInitialX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "longWeightMaintenanceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "shortWeightMaintenanceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "largePositionPenaltyX18",
                type: "int256",
              },
            ],
            internalType: "struct IPerpEngine.Config",
            name: "config",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "int256",
                name: "priceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "emaPriceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "cumulativeFundingLongX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "cumulativeFundingShortX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "openInterestX18",
                type: "int256",
              },
              {
                internalType: "uint256",
                name: "fundingLastUpdated",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "emaPriceLastUpdated",
                type: "uint256",
              },
              {
                internalType: "int256",
                name: "availableSettleX18",
                type: "int256",
              },
            ],
            internalType: "struct IPerpEngine.State",
            name: "state",
            type: "tuple",
          },
        ],
        internalType: "struct IPerpEngine.Product",
        name: "product",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "amountX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "vQuoteBalanceX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "lastCumulativeFundingX18",
            type: "int256",
          },
        ],
        internalType: "struct IPerpEngine.Balance",
        name: "balance",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
    ],
    name: "hasAssets",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_clearinghouse",
        type: "address",
      },
      {
        internalType: "address",
        name: "_quote",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sequencer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "_fees",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subaccountId",
        type: "uint64",
      },
    ],
    name: "settlePnl",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
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
        internalType: "int256",
        name: "vQuoteX18",
        type: "int256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
    ],
    name: "socializeProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IPerpEngine__factory {
  static readonly abi = _abi;
  static createInterface(): IPerpEngineInterface {
    return new utils.Interface(_abi) as IPerpEngineInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPerpEngine {
    return new Contract(address, _abi, signerOrProvider) as IPerpEngine;
  }
}
