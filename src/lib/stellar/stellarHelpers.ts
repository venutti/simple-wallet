import type { AccountResponse } from "stellar-sdk";

export function getXLMBalanceFromAccount(account: AccountResponse) {
  const ASSET_TYPE_NATIVE = "native";
  return account.balances.find(
    (balance) => balance.asset_type === ASSET_TYPE_NATIVE
  ).balance;
}

export function getPublicKeyFromAccount(account: AccountResponse) {
  return account.account_id;
}
