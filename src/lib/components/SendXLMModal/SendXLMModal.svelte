<script lang="ts">
  import { wallet } from "../../store/global";
  import { notifySuccess, notifyError } from "../../utils/notification";

  export let open: boolean;
  export let onClose: () => void;

  let receiverPublicKey: string;
  let amount: string;

  function handleKeyup(event: KeyboardEvent) {
    const ESCAPE_KEY = "Escape";
    if (event.key === ESCAPE_KEY) {
      onClose();
    }
  }

  function handleModalClick(event: MouseEvent) {
    event.stopPropagation();
    return;
  }

  async function handleSendButton() {
    try {
      await $wallet.pay(amount, receiverPublicKey);
      notifySuccess(`Successfully sent ${amount} XLM to ${receiverPublicKey}`);
      onClose();
    } catch (error) {
      notifyError(error.message);
      console.error(error);
    }
  }
</script>

{#if open}
  <div class="overlay" on:click={onClose} on:keyup={handleKeyup}>
    <div class="modal" on:click={handleModalClick} on:keyup={handleKeyup}>
      <h1>Send XLM</h1>

      <input bind:value={amount} type="text" placeholder="Amount" />
      <input bind:value={receiverPublicKey} type="text" placeholder="Destination" />

      <button on:click={handleSendButton}>Send</button>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    z-index: 10;
  }

  .modal {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 1rem;
    width: 30rem;
    max-width: 90%;
    text-align: center;

    display: grid;
    place-content: center;
    gap: 0.5rem;
  }

  input {
    display: block;
  }
</style>
