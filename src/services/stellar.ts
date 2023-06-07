import { Keypair, Server } from "stellar-sdk";
import type { IKeypair, IAccount } from "./interfaces";

import { mapStellarAccount, mapStellarKeypair } from "../lib/utils/utils";

const server = new Server("https://horizon-testnet.stellar.org");

export function generateRandomKeypair(): IKeypair {
  const keypair = Keypair.random();
  return mapStellarKeypair(keypair);
}

export async function fundAccountWithFriendbot(
  accountPublicKey: string
): Promise<void> {
  await server.friendbot(accountPublicKey).call();
}

export async function createAccount(): Promise<IAccount> {
  const keypair = generateRandomKeypair();
  await fundAccountWithFriendbot(keypair.publicKey);
  return getAccount(keypair);
}

export async function getAccount(keypair: IKeypair): Promise<IAccount> {
  const account = await server.loadAccount(keypair.publicKey);
  return mapStellarAccount(account, keypair);
}
