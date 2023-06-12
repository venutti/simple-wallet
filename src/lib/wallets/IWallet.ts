export default interface IWallet {
  init(privateKey?: string): Promise<void>;
  getPublicKey(): Promise<string>;
  pay(amount: string, destination: string): Promise<string>;
}
