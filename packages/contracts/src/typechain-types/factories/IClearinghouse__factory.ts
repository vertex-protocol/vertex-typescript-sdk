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
        name: "sequencer",
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
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "subaccount",
        type: "uint64",
      },
    ],
    name: "CreateSubaccount",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "liquidatorSubaccount",
        type: "uint64",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "liquidateeSubaccount",
        type: "uint64",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "liquidatorBaseDelta",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "liquidatorQuoteDelta",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "insuranceCoverage",
        type: "int256",
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
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
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
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "string",
            name: "subaccountName",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct ISequencer.DepositCollateral",
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
        internalType: "uint64",
        name: "subaccount",
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
        name: "subaccount",
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
    inputs: [],
    name: "getInsurance",
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
    inputs: [],
    name: "getNumSubaccounts",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
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
    inputs: [],
    name: "getSequencer",
    outputs: [
      {
        internalType: "address",
        name: "sequencer",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "subaccountName",
        type: "string",
      },
    ],
    name: "getSubaccountId",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
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
    name: "getSubaccountOwner",
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
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "string",
            name: "subaccountName",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "liquidateeId",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "int256",
            name: "amount",
            type: "int256",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct ISequencer.LiquidateSubaccount",
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
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
    ],
    name: "modifyInsurance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
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
            internalType: "uint64[]",
            name: "subaccountIds",
            type: "uint64[]",
          },
        ],
        internalType: "struct ISequencer.SettlePnl",
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
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "string",
            name: "subaccountName",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct ISequencer.WithdrawCollateral",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "withdrawCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

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
