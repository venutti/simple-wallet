import {
  Keypair,
  Server,
  TransactionBuilder,
  Operation,
  Asset,
} from "stellar-sdk";

const server = new Server(import.meta.env.VITE_STELLAR_NETWORK);

export function generateRandomKeypair(): Keypair {
  return Keypair.random();
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
  return await server.loadAccount(accountPublicKey);
}

export async function sendToAccount(
  amount: number,
  senderSecretKey: string,
  receiverPublicKey: string
) {
  const MAX_SECONDS_AWAIT = 60;

  const senderKeypair = Keypair.fromSecret(senderSecretKey);
  const receiverKeypair = Keypair.fromPublicKey(receiverPublicKey);

  const senderAccount = await getAccount(senderKeypair.publicKey());
  const transaction = new TransactionBuilder(senderAccount, {
    fee: `${await server.fetchBaseFee()}`,
    networkPassphrase: import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        amount: `${amount}`,
        asset: Asset.native(),
        destination: receiverKeypair.publicKey(),
      })
    )
    .setTimeout(MAX_SECONDS_AWAIT)
    .build();

  transaction.sign(senderKeypair);

  const response = await server.submitTransaction(transaction);
  return response;
}
