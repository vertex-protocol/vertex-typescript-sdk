/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IOffchainBook, IOffchainBookInterface } from "../IOffchainBook";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderDigest",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IOffchainBook.ValidationResult",
        name: "reason",
        type: "uint8",
      },
    ],
    name: "CancelOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "takerDigest",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "makerDigest",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "takerAmountDelta",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "takerFee",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "makerFee",
        type: "int256",
      },
    ],
    name: "FillOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "orderDigest",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "subaccount",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "priceX18",
        type: "int256",
      },
    ],
    name: "ReportOrder",
    type: "event",
  },
  {
    inputs: [],
    name: "dumpFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "subaccount",
            type: "uint64",
          },
          {
            internalType: "int256",
            name: "priceX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "amount",
            type: "int256",
          },
          {
            internalType: "uint64",
            name: "expiration",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct ISequencer.Order",
        name: "order",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "isCancellation",
        type: "bool",
      },
    ],
    name: "getDigest",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMarkPriceX18",
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
    name: "getMarket",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "int256",
            name: "sizeIncrementX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "priceIncrementX18",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "collectedFeesX18",
            type: "int256",
          },
        ],
        internalType: "struct IOffchainBook.Market",
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
        internalType: "contract IClearinghouse",
        name: "_clearinghouse",
        type: "address",
      },
      {
        internalType: "contract IProductEngine",
        name: "_engine",
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
        internalType: "contract IFeeCalculator",
        name: "_fees",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_productId",
        type: "uint32",
      },
      {
        internalType: "int256",
        name: "_sizeIncrementX18",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "_priceIncrementX18",
        type: "int256",
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
        components: [
          {
            internalType: "address",
            name: "book",
            type: "address",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint64",
                    name: "subaccount",
                    type: "uint64",
                  },
                  {
                    internalType: "int256",
                    name: "priceX18",
                    type: "int256",
                  },
                  {
                    internalType: "int256",
                    name: "amount",
                    type: "int256",
                  },
                  {
                    internalType: "uint64",
                    name: "expiration",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "nonce",
                    type: "uint64",
                  },
                ],
                internalType: "struct ISequencer.Order",
                name: "order",
                type: "tuple",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct ISequencer.SignedOrder",
            name: "taker",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint64",
                    name: "subaccount",
                    type: "uint64",
                  },
                  {
                    internalType: "int256",
                    name: "priceX18",
                    type: "int256",
                  },
                  {
                    internalType: "int256",
                    name: "amount",
                    type: "int256",
                  },
                  {
                    internalType: "uint64",
                    name: "expiration",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "nonce",
                    type: "uint64",
                  },
                ],
                internalType: "struct ISequencer.Order",
                name: "order",
                type: "tuple",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct ISequencer.SignedOrder",
            name: "maker",
            type: "tuple",
          },
        ],
        internalType: "struct ISequencer.MatchOrders",
        name: "tx",
        type: "tuple",
      },
    ],
    name: "matchOrders",
    outputs: [
      {
        internalType: "enum IOffchainBook.ValidationResult",
        name: "",
        type: "uint8",
      },
      {
        internalType: "enum IOffchainBook.ValidationResult",
        name: "",
        type: "uint8",
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
            components: [
              {
                internalType: "uint64",
                name: "subaccount",
                type: "uint64",
              },
              {
                internalType: "int256",
                name: "priceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "amount",
                type: "int256",
              },
              {
                internalType: "uint64",
                name: "expiration",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
            ],
            internalType: "struct ISequencer.Order",
            name: "order",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct ISequencer.SignedOrder",
        name: "order",
        type: "tuple",
      },
    ],
    name: "validateCancellation",
    outputs: [
      {
        internalType: "enum IOffchainBook.ValidationResult",
        name: "",
        type: "uint8",
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
            components: [
              {
                internalType: "uint64",
                name: "subaccount",
                type: "uint64",
              },
              {
                internalType: "int256",
                name: "priceX18",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "amount",
                type: "int256",
              },
              {
                internalType: "uint64",
                name: "expiration",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
            ],
            internalType: "struct ISequencer.Order",
            name: "order",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct ISequencer.SignedOrder",
        name: "order",
        type: "tuple",
      },
    ],
    name: "validateOrder",
    outputs: [
      {
        internalType: "enum IOffchainBook.ValidationResult",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IOffchainBook__factory {
  static readonly abi = _abi;
  static createInterface(): IOffchainBookInterface {
    return new utils.Interface(_abi) as IOffchainBookInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IOffchainBook {
    return new Contract(address, _abi, signerOrProvider) as IOffchainBook;
  }
}
