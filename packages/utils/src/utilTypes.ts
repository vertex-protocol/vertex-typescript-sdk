/**
 * Create a type that requires exactly one of the given keys and disallows more. The remaining keys are kept as is.
 * source: https://github.com/sindresorhus/type-fest/blob/main/source/require-exactly-one.d.ts
 */
export type RequireExactlyOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = {
  [Key in KeysType]: Required<Pick<ObjectType, Key>> &
    Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
  Omit<ObjectType, KeysType>;
