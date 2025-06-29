import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/auth/auth";

import type { LayoutServerLoad } from "./$types";

export const load = (async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    throw redirect(302, "/auth/login");
  }

  return {
    session,
  };
}) satisfies LayoutServerLoad;
