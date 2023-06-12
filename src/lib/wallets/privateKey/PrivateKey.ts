import IWallet from "../IWallet";
import { importKeypairFromSecret, sendToAccount } from "../../stellar/stellar";
import StellarKey from "../stellarKey/StellarKey";

const NO_ACCOUNT_ERROR = "You have not initialized an account";

export default class PrivateKey extends StellarKey implements IWallet {
  public override async init(privateKey: string) {
    try {
      const keypair = importKeypairFromSecret(privateKey);
      this.PUBLIC_KEY = keypair.publicKey();
      this.PRIVATE_KEY = keypair.secret();
    } catch (error) {
      this.PUBLIC_KEY = "";
      this.PRIVATE_KEY = "";
      throw error;
    }
  }
}
