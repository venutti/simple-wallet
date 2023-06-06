<script lang="ts">
  import LogInWallet from "./LogInWallet.svelte";
  import type { IKeypair, IAccount } from "../services/stellar";
  import { generateKeypair, getAccount, fundAccount } from "../services/stellar";

  let userKeypair: IKeypair;
  let userAccount: IAccount;

  function loadKeypair() {
    userKeypair = generateKeypair();
  }

  function loadAccount(publicId: string) {
    getAccount(publicId).then(account => {
      userAccount = account;
    })
  }

</script>

<div>
  <!-- {#if !userKeypair && !userAccount}
    <button on:click={loadKeypair}>Crear cuenta</button>
  {:else if userKeypair && !userAccount}
    <p>Tu PublicKey es: {userKeypair.publicKey}</p>
    <p>Tu SecretKey es: {userKeypair.secretKey}</p>
    <button on:click={() => fundAccount(userKeypair.publicKey)}>Fondear</button>
    <button on:click={() => loadAccount(userKeypair.publicKey)}>Ingresar</button>
  {:else}
    <p>Tu PublicKey es: {userAccount.id}</p>
    <h2>Balance</h2>
    {#each userAccount.balance as balance}
      <p>{balance.asset} - {balance.balance}</p>
    {/each}
  {/if} -->
  <LogInWallet />
</div>

<style>

</style>