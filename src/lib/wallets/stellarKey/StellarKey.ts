import IWallet from "../IWallet";
import { sendToAccount } from "../../stellar/stellar";

const NOT_IMPLEMENTED_ERROR = "Not implemented";
const NO_ACCOUNT_ERROR = "You have not initialized an account";

export default abstract class StellarKey implements IWallet {
  protected PUBLIC_KEY: string = "";
  protected PRIVATE_KEY: string = "";

  public async init(privateKey?: string) {
    throw new Error(NOT_IMPLEMENTED_ERROR);
  }

  public async getPublicKey(): Promise<string> {
    if (!this.PRIVATE_KEY) {
      throw new Error(NO_ACCOUNT_ERROR);
    }

    return this.PUBLIC_KEY;
  }

  public async pay(amount: string, destination: string): Promise<string> {
    if (!this.PRIVATE_KEY) {
      throw new Error(NO_ACCOUNT_ERROR);
    }

    try {
      const tx = await sendToAccount(
        Number(amount),
        this.PRIVATE_KEY,
        destination
      );
      return tx.result_xdr;
    } catch (error) {
      throw error;
    }
  }
}
