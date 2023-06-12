import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import IWallet from "../wallets/IWallet";

export const wallet: Writable<IWallet | null> = writable(null);
