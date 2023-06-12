export default interface IWallet {
  getPublicKey(): Promise<string>;
  pay(amount: string, destination: string): Promise<string>;
}
