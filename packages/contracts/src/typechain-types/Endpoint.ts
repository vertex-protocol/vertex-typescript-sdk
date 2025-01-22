/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace IEndpoint {
  export type PricesStruct = {
    spotPriceX18: bigint;
    perpPriceX18: bigint;
  };

  export type PricesStructOutput = [
    spotPriceX18: bigint,
    perpPriceX18: bigint
  ] & { spotPriceX18: bigint; perpPriceX18: bigint };
}

export interface EndpointInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "clearinghouse"
      | "depositCollateral"
      | "depositCollateralWithReferral(bytes32,uint32,uint128,string)"
      | "depositCollateralWithReferral(bytes12,uint32,uint128,string)"
      | "executeSlowModeTransactions"
      | "getBook"
      | "getNonce"
      | "getPriceX18"
      | "getPricesX18"
      | "getSequencer"
      | "getSubaccountId"
      | "getTime"
      | "getVersion"
      | "initialize"
      | "nSubmissions"
      | "owner"
      | "processSlowModeTransaction"
      | "referralCodes"
      | "registerTransferableWallet"
      | "renounceOwnership"
      | "requireSubaccount"
      | "sequencerFee"
      | "sequencerFees"
      | "setBook"
      | "setSequencer"
      | "slowModeConfig"
      | "slowModeTxs"
      | "submitSlowModeTransaction"
      | "submitTransactions"
      | "submitTransactionsChecked"
      | "submitTransactionsCheckedWithGasLimit"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Initialized"
      | "OwnershipTransferred"
      | "SubmitTransactions"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "clearinghouse",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateral",
    values: [BytesLike, bigint, bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateralWithReferral(bytes32,uint32,uint128,string)",
    values: [BytesLike, bigint, bigint, string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateralWithReferral(bytes12,uint32,uint128,string)",
    values: [BytesLike, bigint, bigint, string]
  ): string;
  encodeFunctionData(
    functionFragment: "executeSlowModeTransactions",
    values: [bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "getBook",
    values: [bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "getNonce",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPriceX18",
    values: [bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "getPricesX18",
    values: [bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "getSequencer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSubaccountId",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "getTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      bigint,
      bigint,
      bigint[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "nSubmissions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "processSlowModeTransaction",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "referralCodes",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerTransferableWallet",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requireSubaccount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "sequencerFee",
    values: [bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "sequencerFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBook",
    values: [bigint, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setSequencer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "slowModeConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "slowModeTxs",
    values: [bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "submitSlowModeTransaction",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "submitTransactions",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "submitTransactionsChecked",
    values: [bigint, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "submitTransactionsCheckedWithGasLimit",
    values: [bigint, BytesLike[], bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "clearinghouse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateralWithReferral(bytes32,uint32,uint128,string)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateralWithReferral(bytes12,uint32,uint128,string)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeSlowModeTransactions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBook", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPriceX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPricesX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSequencer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubaccountId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nSubmissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processSlowModeTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "referralCodes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerTransferableWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requireSubaccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sequencerFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sequencerFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBook", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSequencer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "slowModeConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "slowModeTxs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitSlowModeTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitTransactions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitTransactionsChecked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitTransactionsCheckedWithGasLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace InitializedEvent {
  export type InputTuple = [version: bigint];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubmitTransactionsEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Endpoint extends BaseContract {
  connect(runner?: ContractRunner | null): Endpoint;
  waitForDeployment(): Promise<this>;

  interface: EndpointInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  clearinghouse: TypedContractMethod<[], [string], "view">;

  depositCollateral: TypedContractMethod<
    [subaccountName: BytesLike, productId: bigint, amount: bigint],
    [void],
    "nonpayable"
  >;

  "depositCollateralWithReferral(bytes32,uint32,uint128,string)": TypedContractMethod<
    [
      subaccount: BytesLike,
      productId: bigint,
      amount: bigint,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;

  "depositCollateralWithReferral(bytes12,uint32,uint128,string)": TypedContractMethod<
    [
      subaccountName: BytesLike,
      productId: bigint,
      amount: bigint,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;

  executeSlowModeTransactions: TypedContractMethod<
    [count: bigint],
    [void],
    "nonpayable"
  >;

  getBook: TypedContractMethod<[productId: bigint], [string], "view">;

  getNonce: TypedContractMethod<[sender: AddressLike], [bigint], "view">;

  getPriceX18: TypedContractMethod<[productId: bigint], [bigint], "view">;

  getPricesX18: TypedContractMethod<
    [healthGroup: bigint],
    [IEndpoint.PricesStructOutput],
    "view"
  >;

  getSequencer: TypedContractMethod<[], [string], "view">;

  getSubaccountId: TypedContractMethod<
    [subaccount: BytesLike],
    [bigint],
    "view"
  >;

  getTime: TypedContractMethod<[], [bigint], "view">;

  getVersion: TypedContractMethod<[], [bigint], "view">;

  initialize: TypedContractMethod<
    [
      _sanctions: AddressLike,
      _sequencer: AddressLike,
      _clearinghouse: AddressLike,
      slowModeTimeout: bigint,
      _time: bigint,
      _prices: bigint[]
    ],
    [void],
    "nonpayable"
  >;

  nSubmissions: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  processSlowModeTransaction: TypedContractMethod<
    [sender: AddressLike, transaction: BytesLike],
    [void],
    "nonpayable"
  >;

  referralCodes: TypedContractMethod<[arg0: AddressLike], [string], "view">;

  registerTransferableWallet: TypedContractMethod<
    [wallet: AddressLike, transferable: boolean],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  requireSubaccount: TypedContractMethod<
    [subaccount: BytesLike],
    [void],
    "view"
  >;

  sequencerFee: TypedContractMethod<[arg0: bigint], [bigint], "view">;

  sequencerFees: TypedContractMethod<[], [bigint], "view">;

  setBook: TypedContractMethod<
    [productId: bigint, book: AddressLike],
    [void],
    "nonpayable"
  >;

  setSequencer: TypedContractMethod<
    [_sequencer: AddressLike],
    [void],
    "nonpayable"
  >;

  slowModeConfig: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint] & {
        timeout: bigint;
        txCount: bigint;
        txUpTo: bigint;
      }
    ],
    "view"
  >;

  slowModeTxs: TypedContractMethod<
    [arg0: bigint],
    [
      [bigint, string, string] & {
        executableAt: bigint;
        sender: string;
        tx: string;
      }
    ],
    "view"
  >;

  submitSlowModeTransaction: TypedContractMethod<
    [transaction: BytesLike],
    [void],
    "nonpayable"
  >;

  submitTransactions: TypedContractMethod<
    [transactions: BytesLike[]],
    [void],
    "nonpayable"
  >;

  submitTransactionsChecked: TypedContractMethod<
    [idx: bigint, transactions: BytesLike[]],
    [void],
    "nonpayable"
  >;

  submitTransactionsCheckedWithGasLimit: TypedContractMethod<
    [idx: bigint, transactions: BytesLike[], gasLimit: bigint],
    [[bigint, bigint]],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "clearinghouse"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "depositCollateral"
  ): TypedContractMethod<
    [subaccountName: BytesLike, productId: bigint, amount: bigint],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositCollateralWithReferral(bytes32,uint32,uint128,string)"
  ): TypedContractMethod<
    [
      subaccount: BytesLike,
      productId: bigint,
      amount: bigint,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositCollateralWithReferral(bytes12,uint32,uint128,string)"
  ): TypedContractMethod<
    [
      subaccountName: BytesLike,
      productId: bigint,
      amount: bigint,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "executeSlowModeTransactions"
  ): TypedContractMethod<[count: bigint], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getBook"
  ): TypedContractMethod<[productId: bigint], [string], "view">;
  getFunction(
    nameOrSignature: "getNonce"
  ): TypedContractMethod<[sender: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPriceX18"
  ): TypedContractMethod<[productId: bigint], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPricesX18"
  ): TypedContractMethod<
    [healthGroup: bigint],
    [IEndpoint.PricesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getSequencer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getSubaccountId"
  ): TypedContractMethod<[subaccount: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVersion"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      _sanctions: AddressLike,
      _sequencer: AddressLike,
      _clearinghouse: AddressLike,
      slowModeTimeout: bigint,
      _time: bigint,
      _prices: bigint[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "nSubmissions"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "processSlowModeTransaction"
  ): TypedContractMethod<
    [sender: AddressLike, transaction: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "referralCodes"
  ): TypedContractMethod<[arg0: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "registerTransferableWallet"
  ): TypedContractMethod<
    [wallet: AddressLike, transferable: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "requireSubaccount"
  ): TypedContractMethod<[subaccount: BytesLike], [void], "view">;
  getFunction(
    nameOrSignature: "sequencerFee"
  ): TypedContractMethod<[arg0: bigint], [bigint], "view">;
  getFunction(
    nameOrSignature: "sequencerFees"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "setBook"
  ): TypedContractMethod<
    [productId: bigint, book: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setSequencer"
  ): TypedContractMethod<[_sequencer: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "slowModeConfig"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint] & {
        timeout: bigint;
        txCount: bigint;
        txUpTo: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "slowModeTxs"
  ): TypedContractMethod<
    [arg0: bigint],
    [
      [bigint, string, string] & {
        executableAt: bigint;
        sender: string;
        tx: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "submitSlowModeTransaction"
  ): TypedContractMethod<[transaction: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "submitTransactions"
  ): TypedContractMethod<[transactions: BytesLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "submitTransactionsChecked"
  ): TypedContractMethod<
    [idx: bigint, transactions: BytesLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "submitTransactionsCheckedWithGasLimit"
  ): TypedContractMethod<
    [idx: bigint, transactions: BytesLike[], gasLimit: bigint],
    [[bigint, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "SubmitTransactions"
  ): TypedContractEvent<
    SubmitTransactionsEvent.InputTuple,
    SubmitTransactionsEvent.OutputTuple,
    SubmitTransactionsEvent.OutputObject
  >;

  filters: {
    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "SubmitTransactions()": TypedContractEvent<
      SubmitTransactionsEvent.InputTuple,
      SubmitTransactionsEvent.OutputTuple,
      SubmitTransactionsEvent.OutputObject
    >;
    SubmitTransactions: TypedContractEvent<
      SubmitTransactionsEvent.InputTuple,
      SubmitTransactionsEvent.OutputTuple,
      SubmitTransactionsEvent.OutputObject
    >;
  };
}
