<script lang="ts">
  export let show: boolean;
  export let message: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let options: Array<any> | undefined = undefined;
  export let resolve: Function | undefined = undefined;
  export let reject: Function | undefined = undefined;
  let input = "";

  function cancel(event: Event) {
    event.preventDefault();
    show = false;
    reject?.(null);
  }

  function submit(event: Event) {
    event.preventDefault();
    show = false;
    resolve?.(input);
  }

  function update(event: Event) {
    input = (event.target as HTMLInputElement).value.toUpperCase();
  }

  function keydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      cancel(event);
    } else if (event.key === "Enter") {
      submit(event);
    }
  }
</script>

<!-- Si show es true, renderiza el prompt, sino no -->
{#if show}
  <div class="prompt-wrapper">
    <div class="prompt">
      {#if message} <p>{message}</p> {/if}

      {#if options}
        <div class="select-wrapper">
          <select bind:value={input} on:change={update} on:keydown={keydown}>
            {#each options as option}
              <option value={`${option.code}:${option.issuer}`} selected={input === `${option.code}:${option.issuer}`}>{option.code}</option>
            {/each}
          </select>
        </div>
      {:else}
        <input bind:value={input} on:change={update} on:keydown={keydown} placeholder={placeholder} />
      {/if}

      <div class="actions">
        <button class="cancel" on:click={cancel}>Cancel</button>
        <button class="submit" on:click={submit}>Submit</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .prompt-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    min-height: 100vh;
    min-width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  .prompt {
    background-color: white;
    border-radius: 30px;
    padding: 30px;
    max-width: 350px;
    width: 100%;
    position: relative;
  }

  p {
    color: black;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    margin: 0;
    padding: 5px;
    outline: none;
    border: 1px solid black;
    text-transform: uppercase;
  }
  input:focus {
    border-color: blue;
  }

  .select-wrapper {
    position: relative;
    display: inline-flex;
  }

  select {
    border-color: blue;
    padding: 5px 20px;
    min-width: 100px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    gap: 10px;
  }

  button {
    margin: 0;
    min-width: 50px;
  }
  .cancel {
    background-color: none;
    border: 1px solid red;
    color: red;
  }
  .submit {
    background-color: none;
    border: 1px solid green;
    color: green;
  }
</style>