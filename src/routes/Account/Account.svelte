<script lang="ts">
  import SendXLMModal from "../../lib/components/SendXLMModal/SendXLMModal.svelte";

  let isModalOpen: boolean = false;

  function handleModal() {
    isModalOpen = !isModalOpen;
  }
</script>

<div>
  <div class="sign-out">
    <button>Sign out</button>
  </div>

  <div class="account">
    <h1>Your Balance</h1>
    <p class="balance">
      10000 Lumens (XLM)
    </p>

    <div class="public-key">
      <p>Your Stellar public key:</p>
      <input type="text" disabled value="publicKey" />
    </div>

    <div class="actions">
      <button on:click={handleModal}>Send</button>
    </div>
  </div>

  <SendXLMModal open={isModalOpen} onClose={handleModal} />
</div>

<style>
  .sign-out {
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
