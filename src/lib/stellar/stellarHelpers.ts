import type { AccountResponse } from "stellar-sdk";

export function getXLMBalanceFromAccount(account: AccountResponse) {
  const NATIVE_ASSET_TYPE = "native";
  return account.balances.find(
    (balance) => balance.asset_type === NATIVE_ASSET_TYPE
  ).balance;
}

export function getPublicKeyFromAccount(account: AccountResponse) {
  return account.account_id;
}
