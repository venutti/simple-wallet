<script lang="ts">
  import SendXMLModal from "./SendXMLModal.svelte";

  let open: boolean = false;

  function openModal() {
    open = true;
  }

  function closeModal() {
    open = false;
  }
</script>

<div>
  <div class="sign-out">
    <button>Sign out</button>
  </div>

  <div class="account">
    <h1>Your Balance</h1>
    <p class="balance">
      10000 Lumens (XML)
    </p>

    <div class="public-key">
      <p>Your Stellar public key:</p>
      <input type="text" disabled value="publicKey" />
    </div>

    <div class="actions">
      <button on:click={openModal}>Send</button>
    </div>
  </div>

  <SendXMLModal {open} onClose={closeModal} />
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