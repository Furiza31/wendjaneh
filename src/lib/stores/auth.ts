import { goto } from "$app/navigation";
import { authClient } from "$lib/auth/auth-client";
import { derived, writable } from "svelte/store";

import type { Provider } from "./providers";

export const session = authClient.useSession();

export const user = derived(
  session,
  $session => $session.data?.user ?? null,
);

export const sending = writable(false);

export const loading = derived(
  [session, sending],
  ([$session, $sending]) => $session.isPending || $sending,
);

export async function signIn(provider: Provider) {
  sending.set(true);
  try {
    await authClient.signIn.social({
      provider,
      callbackURL: "/app",
      errorCallbackURL: "/auth/error",
    });
  }
  finally {
    sending.set(false);
  }
}

export async function credentialSignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  sending.set(true);
  try {
    await authClient.signIn.email(
      { email, password },
      {
        onError: (err) => {
          throw err.error?.message ?? "Erreur inconnue";
        },
        onSuccess: () => {
          goto("/app");
        },
      },
    );
  }
  finally {
    sending.set(false);
  }
}

export async function credentialRegister({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  sending.set(true);
  try {
    await authClient.signUp.email(
      { name, email, password },
      {
        onError: (err) => {
          throw err.error?.message ?? "Erreur inconnue";
        },
        onSuccess: () => {
          goto("/app");
        },
      },
    );
  }
  finally {
    sending.set(false);
  }
}

export async function signOut() {
  sending.set(true);
  await authClient.signOut();
  sending.set(false);
  goto("/auth/login");
}
