<div class="login-wallet">
  <h1>Welcome to you Stellar Wallet</h1>

  <button>Create account</button>

  <label>
    <span>If you have an account, import your secret key:</span>
    <div>
      <input type="text" placeholder="Secret key" />
      <button>Import</button>
    </div>
  </label>

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
