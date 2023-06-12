import IWallet from "../IWallet";
import albedo from "@albedo-link/intent";

export default class Albedo implements IWallet {
  async getPublicKey(): Promise<string> {
    try {
      const requestPubKey = await albedo.publicKey({});
      return requestPubKey.pubkey;
    } catch (error) {
      throw error;
    }
  }

  async pay(amount: string, destination: string): Promise<string> {
    try {
      const requestPay = await albedo.pay({ amount, destination });
      return requestPay.signed_envelope_xdr;
    } catch (error) {
      throw error;
    }
  }
}
