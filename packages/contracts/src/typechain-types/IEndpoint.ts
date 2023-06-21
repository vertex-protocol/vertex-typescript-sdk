/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace IEndpoint {
  export type PricesStruct = {
    spotPriceX18: PromiseOrValue<BigNumberish>;
    perpPriceX18: PromiseOrValue<BigNumberish>;
  };

  export type PricesStructOutput = [BigNumber, BigNumber] & {
    spotPriceX18: BigNumber;
    perpPriceX18: BigNumber;
  };
}

export interface IEndpointInterface extends utils.Interface {
  functions: {
    "depositCollateral(bytes12,uint32,uint128)": FunctionFragment;
    "depositCollateralWithReferral(bytes12,uint32,uint128,bytes32)": FunctionFragment;
    "getNonce(address)": FunctionFragment;
    "getNumSubaccounts()": FunctionFragment;
    "getPriceX18(uint32)": FunctionFragment;
    "getPricesX18(uint32)": FunctionFragment;
    "getSubaccountById(uint64)": FunctionFragment;
    "getSubaccountId(bytes32)": FunctionFragment;
    "getTime()": FunctionFragment;
    "getVersion()": FunctionFragment;
    "setBook(uint32,address)": FunctionFragment;
    "submitSlowModeTransaction(bytes)": FunctionFragment;
    "submitTransactionsChecked(uint64,bytes[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "depositCollateral"
      | "depositCollateralWithReferral"
      | "getNonce"
      | "getNumSubaccounts"
      | "getPriceX18"
      | "getPricesX18"
      | "getSubaccountById"
      | "getSubaccountId"
      | "getTime"
      | "getVersion"
      | "setBook"
      | "submitSlowModeTransaction"
      | "submitTransactionsChecked"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "depositCollateral",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateralWithReferral",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getNonce",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNumSubaccounts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPriceX18",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPricesX18",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubaccountById",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubaccountId",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "getTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBook",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitSlowModeTransaction",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitTransactionsChecked",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateralWithReferral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getNumSubaccounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPriceX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPricesX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubaccountById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubaccountId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setBook", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitSlowModeTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitTransactionsChecked",
    data: BytesLike
  ): Result;

  events: {
    "SubmitSlowModeTransaction(uint64,address,bytes)": EventFragment;
    "SubmitTransactions()": EventFragment;
    "UserReferral(address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SubmitSlowModeTransaction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubmitTransactions"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UserReferral"): EventFragment;
}

export interface SubmitSlowModeTransactionEventObject {
  executableAt: BigNumber;
  sender: string;
  tx: string;
}
export type SubmitSlowModeTransactionEvent = TypedEvent<
  [BigNumber, string, string],
  SubmitSlowModeTransactionEventObject
>;

export type SubmitSlowModeTransactionEventFilter =
  TypedEventFilter<SubmitSlowModeTransactionEvent>;

export interface SubmitTransactionsEventObject {}
export type SubmitTransactionsEvent = TypedEvent<
  [],
  SubmitTransactionsEventObject
>;

export type SubmitTransactionsEventFilter =
  TypedEventFilter<SubmitTransactionsEvent>;

export interface UserReferralEventObject {
  invitee: string;
  referralCode: string;
}
export type UserReferralEvent = TypedEvent<
  [string, string],
  UserReferralEventObject
>;

export type UserReferralEventFilter = TypedEventFilter<UserReferralEvent>;

export interface IEndpoint extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IEndpointInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    depositCollateral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositCollateralWithReferral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getNonce(
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPricesX18(
      healthGroup: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IEndpoint.PricesStructOutput]>;

    getSubaccountById(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getSubaccountId(
      subaccount: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVersion(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setBook(
      productId: PromiseOrValue<BigNumberish>,
      book: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitSlowModeTransaction(
      transaction: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitTransactionsChecked(
      idx: PromiseOrValue<BigNumberish>,
      transactions: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  depositCollateral(
    subaccountName: PromiseOrValue<BytesLike>,
    productId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositCollateralWithReferral(
    subaccountName: PromiseOrValue<BytesLike>,
    productId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    referralCode: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getNonce(
    sender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getNumSubaccounts(overrides?: CallOverrides): Promise<BigNumber>;

  getPriceX18(
    productId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPricesX18(
    healthGroup: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IEndpoint.PricesStructOutput>;

  getSubaccountById(
    subaccountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getSubaccountId(
    subaccount: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTime(overrides?: CallOverrides): Promise<BigNumber>;

  getVersion(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setBook(
    productId: PromiseOrValue<BigNumberish>,
    book: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitSlowModeTransaction(
    transaction: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitTransactionsChecked(
    idx: PromiseOrValue<BigNumberish>,
    transactions: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    depositCollateral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositCollateralWithReferral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getNonce(
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<BigNumber>;

    getPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPricesX18(
      healthGroup: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IEndpoint.PricesStructOutput>;

    getSubaccountById(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSubaccountId(
      subaccount: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTime(overrides?: CallOverrides): Promise<BigNumber>;

    getVersion(overrides?: CallOverrides): Promise<BigNumber>;

    setBook(
      productId: PromiseOrValue<BigNumberish>,
      book: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    submitSlowModeTransaction(
      transaction: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    submitTransactionsChecked(
      idx: PromiseOrValue<BigNumberish>,
      transactions: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "SubmitSlowModeTransaction(uint64,address,bytes)"(
      executableAt?: null,
      sender?: null,
      tx?: null
    ): SubmitSlowModeTransactionEventFilter;
    SubmitSlowModeTransaction(
      executableAt?: null,
      sender?: null,
      tx?: null
    ): SubmitSlowModeTransactionEventFilter;

    "SubmitTransactions()"(): SubmitTransactionsEventFilter;
    SubmitTransactions(): SubmitTransactionsEventFilter;

    "UserReferral(address,bytes32)"(
      invitee?: null,
      referralCode?: null
    ): UserReferralEventFilter;
    UserReferral(invitee?: null, referralCode?: null): UserReferralEventFilter;
  };

  estimateGas: {
    depositCollateral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositCollateralWithReferral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getNonce(
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<BigNumber>;

    getPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPricesX18(
      healthGroup: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSubaccountById(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSubaccountId(
      subaccount: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTime(overrides?: CallOverrides): Promise<BigNumber>;

    getVersion(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setBook(
      productId: PromiseOrValue<BigNumberish>,
      book: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitSlowModeTransaction(
      transaction: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitTransactionsChecked(
      idx: PromiseOrValue<BigNumberish>,
      transactions: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    depositCollateral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositCollateralWithReferral(
      subaccountName: PromiseOrValue<BytesLike>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getNonce(
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPricesX18(
      healthGroup: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSubaccountById(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSubaccountId(
      subaccount: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVersion(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setBook(
      productId: PromiseOrValue<BigNumberish>,
      book: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitSlowModeTransaction(
      transaction: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitTransactionsChecked(
      idx: PromiseOrValue<BigNumberish>,
      transactions: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
