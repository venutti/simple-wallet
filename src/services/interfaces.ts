export interface IKeypair {
  publicKey: string;
  secretKey: string;
}

export interface IAccount {
  id: string;
  keypair: IKeypair;
  balance: string;
}
