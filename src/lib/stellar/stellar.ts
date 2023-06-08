import { Keypair, Server } from "stellar-sdk";


const server = new Server(import.meta.env.VITE_STELLAR_NETWORK);

export function generateRandomKeypair(): Keypair {
  const keypair = Keypair.random();
  return keypair;
}

export async function fundAccountWithFriendbot(
  accountPublicKey: string
): Promise<void> {
  await server.friendbot(accountPublicKey).call();
}

export async function createAccount() {
  const keypair = generateRandomKeypair();
  await fundAccountWithFriendbot(keypair.publicKey());
  return keypair;
}

export async function getAccount(accountPublicKey: string) {
  const account = await server.loadAccount(accountPublicKey);
  return account;
}

}
