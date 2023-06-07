<script lang="ts">
  export let open: boolean;
  export let onClose: () => void;

  function handleKeyup(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  function handleModalClick(event: MouseEvent) {
    event.stopPropagation();
    return;
  }
</script>

{#if open}
  <div class="overlay" on:click={onClose} on:keyup={handleKeyup}>
    <div class="modal" on:click={handleModalClick} on:keyup={handleKeyup}>
      <h1>Send XLM</h1>

      <input type="text" placeholder="Amount" />
      <input type="text" placeholder="Destination" />

      <button>Send</button>
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