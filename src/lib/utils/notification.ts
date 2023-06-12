import { toast } from "@zerodevx/svelte-toast";

export function notifySuccess(message: string) {
  toast.push(message, {
    theme: {
      "--toastBackground": "#48BB78",
      "--toastBarBackground": "#2F855A",
    },
  });
}

export function notifyError(message: string) {
  toast.push(message, {
    theme: {
      "--toastBackground": "#F56565",
      "--toastBarBackground": "#C53030",
    },
  });
}
