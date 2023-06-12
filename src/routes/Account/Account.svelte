<script lang="ts">
  import SendXLMModal from "../../lib/components/SendXLMModal/SendXLMModal.svelte";
  import { getAccount } from "../../lib/stellar/stellar";
  import { useNavigate } from "svelte-navigator";
  import { wallet } from "../../lib/store/global";
  import { notifySuccess } from "../../lib/utils/notification";
  import { getXLMBalanceFromAccount, getPublicKeyFromAccount } from "../../lib/stellar/stellarHelpers"

  const navigate = useNavigate();

  let isModalOpen: boolean = false;

  function handleSignOut() {
    $wallet = null;
    navigate("/");
    notifySuccess("Logged out correctly");
  }

  function handleSignIn() {
    navigate("/");
  }

  async function handleGetAccount() {
    try {
      console.log("Hey")
      const publicKey = await $wallet.getPublicKey();
      const account = await getAccount(publicKey);
      return account;
    } catch (error) {
      throw error;
    }
  }

  function handleModal() {
    isModalOpen = !isModalOpen;
  }
</script>

{#if !$wallet}
  <div class="sign-in">
    <button on:click={handleSignIn}>Sign in</button>
  </div>
{:else}
  <div class="sign-out">
    <button on:click={handleSignOut}>Sign out</button>
  </div>
  {#await handleGetAccount() }
    <div>Loading...</div>
  {:then account} 
    <div class="account">
      <h1>Your Balance</h1>
      <p class="balance">
        {getXLMBalanceFromAccount(account)} Lumens (XLM)
      </p>

      <div class="public-key">
        <p>Your Stellar public key:</p>
        <input type="text" disabled value={getPublicKeyFromAccount(account)} />
      </div>

      <div class="actions">
        <button on:click={handleModal}>Send</button>
      </div>
    </div>
    <SendXLMModal open={isModalOpen} onClose={handleModal} />
  {:catch}
    <div>Something went wrong</div>
  {/await}
{/if}


<style>
  .sign-out,
  .sign-in {
    display: flex;
    justify-content: end;
  }

  .account {
    display: grid;
    place-items: center;
    gap: 1rem;
  }

  h1 {
    text-align: center;
    margin: 2rem;
  }

  .account .balance {
    font-size: 2rem;
    margin: 0.5rem;
  }
</style>
