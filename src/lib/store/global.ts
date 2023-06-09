import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Keypair } from "stellar-sdk";

export const keypair: Writable<Keypair | null> = writable(null);
