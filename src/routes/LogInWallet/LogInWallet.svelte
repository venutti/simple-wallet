<script>
  import { useNavigate } from "svelte-navigator";
  import { wallet } from "../../lib/store/global"
  import { notifySuccess, notifyError } from "../../lib/utils/notification"; 

  import PrivateKey from "../../lib/wallets/privateKey/PrivateKey";
  import CreatedKey from "../../lib/wallets/createdKey/CreatedKey";
  import Albedo from "../../lib/wallets/albedo/Albedo";

  const navigate = useNavigate();

  let secretKey = "";

  async function handleImportAccount() {
    try {
      const privateKeyWallet = new PrivateKey();
      await privateKeyWallet.init(secretKey);
      wallet.set(privateKeyWallet);
      navigate("/account");
      notifySuccess("Account imported successfully");
    } catch (error) {
      notifyError(`Invalid secret key: ${error.message}`);
      console.error(error);
    }
  }

  async function handleCreateAccount() {
    try {
      const createdKeyWallet = new CreatedKey();
      await createdKeyWallet.init();
      console.log("createdKeyWallet", createdKeyWallet);
      wallet.set(createdKeyWallet);
      navigate("/account");
      notifySuccess("Account created successfully");
    } catch (error) {
      console.error(error);
      notifyError(`Failed account creation: ${error.message}`);
    }
  }

  async function handleAlbedoSignIn() {
    try {
      const albedoWallet = new Albedo();
      await albedoWallet.init();
      wallet.set(albedoWallet);
      navigate("/account");
      notifySuccess("Account signed in successfully");
    } catch (error) {
      console.error(error);
      notifyError("Failed to sign in");
    }
  }
</script>

<div class="login-wallet">
  <h1>Welcome to your Stellar Wallet</h1>

  <button on:click={handleCreateAccount}>Create account</button>

  <label>
    <span>If you have an account, import your secret key:</span>
    <div>
      <input bind:value={secretKey} type="text" placeholder="Secret key" />
      <button on:click={handleImportAccount}>Import</button>
    </div>
  </label>

  <button on:click={handleAlbedoSignIn}>Sign in with Albedo</button>
</div>

<style>
  .login-wallet {
    display: grid;
    place-items: center;
    gap: 2rem;
  }

  h1 {
    text-align: center;
  }

  label {
    display: grid;
    place-items: center;
    gap: 1rem;
  }

  label span {
    display: block;
  }
</style>
