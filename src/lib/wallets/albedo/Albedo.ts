import IWallet from "../IWallet";
import albedo from "@albedo-link/intent";

const NOT_CONNECTED_ERROR = "Not connected";

export default class Albedo implements IWallet {
  private PUBLIC_KEY: string = "";

  async init(): Promise<void> {
    try {
      const publicKey = await albedo.publicKey({});
      this.PUBLIC_KEY = publicKey.pubkey;
    } catch (error) {
      throw error;
    }
  }

  async getPublicKey(): Promise<string> {
    if (!this.PUBLIC_KEY) {
      throw new Error(NOT_CONNECTED_ERROR);
    }
    return this.PUBLIC_KEY;
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
