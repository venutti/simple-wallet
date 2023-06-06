import type { IKeypair, IAccount } from "./interfaces";
import type { AccountResponse, Keypair } from "stellar-sdk";

export function mapStellarAccount(
  account: AccountResponse,
  keypair: IKeypair
): IAccount {
  return {
    id: account.id,
    keypair,
    balance: account.balances.find((b) => b?.asset_type === "native").balance,
  };
}

export function mapStellarKeypair(keypair: Keypair): IKeypair {
  return {
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret(),
  };
}
