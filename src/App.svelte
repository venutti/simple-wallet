<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Account from "./routes/Account/Account.svelte"
  import LogInWallet from "./routes/LogInWallet/LogInWallet.svelte";
</script>

<main>
  <Router>
    <nav class="nav">
      <Link class="link" to="/">Log In</Link>
      <Link class="link" to="/account">Account</Link>
    </nav>
    <div>
      <Route path="/">
        <LogInWallet />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
    </div>
  </Router>

</main>

<style>
  .nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .nav :global(.link) {
    text-decoration: none;
    color: inherit;
  }
</style>
