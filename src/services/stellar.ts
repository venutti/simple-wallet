import { Keypair, Server } from "stellar-sdk";

const server = new Server("https://horizon-testnet.stellar.org");

export interface IKeypair {
  publicKey: string;
  secretKey: string;
}

interface Balance {
  balance: string;
  asset: string;
}

export interface IAccount {
  id: string;
  balance: Array<Balance>;
}

export function generateKeypair(): IKeypair {
  const keypair = Keypair.random();
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();

  return {
    publicKey,
    secretKey,
  };
}

export async function getAccount(publicKey: string): Promise<IAccount> {
  const account = await server.loadAccount(publicKey);
  const id = account.id as string;
  const balance = account.balances.map((b) => {
    return {
      balance: b.balance,
      asset: b.asset,
    };
  });
  return {
    id,
    balance,
  };
}

export async function fundAccount(publicKey: string) {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
  } catch (e) {
    console.error("ERROR!", e);
  }
}
