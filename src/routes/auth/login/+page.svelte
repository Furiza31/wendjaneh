<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import * as Card from "$lib/components/ui/card/index";
  import { sending, signIn } from "$lib/stores/auth.js";
  import { LoaderCircle } from "lucide-svelte";

  import type { PageData } from "./$types.js";

  import LoginForm from "./login-form.svelte";
  const { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Login</title>
  <meta name="description" content="Login to your account" />
</svelte:head>

<Card.Root class="w-full max-w-sm flex flex-col gap-4">
  <Card.Header class="flex flex-col justify-center items-center gap-1">
    <Card.Title class="text-2xl font-bold text-center">Welcome back</Card.Title>
    <p class="text-muted-foreground text-balance text-center">
      Login to your account to continue
    </p>
  </Card.Header>
  <Card.Content>
    <LoginForm {data} />
  </Card.Content>
  <Card.Footer class="flex flex-col items-center gap-2">
    <div
      class="mb-2.5 w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
    >
      <span class="bg-card text-muted-foreground relative z-10 px-2">
        Or continue with
      </span>
    </div>
    <div class="flex flex-row gap-2 w-full">
      <Button variant="outline" type="button" class="grow" onclick={() => signIn("google")} disabled={$sending}>
        {#if $sending}
          <LoaderCircle class="animate-spin" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          <span class="sr-only">Login with Google</span>
        {/if}
      </Button>
      <Button variant="outline" type="button" class="grow" onclick={() => signIn("github")} disabled={$sending}>
        {#if $sending}
          <LoaderCircle class="animate-spin" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.005 2.045.138 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.372.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"
              fill="currentColor"
            />
          </svg>
          <span class="sr-only">Login with GitHub</span>
        {/if}
      </Button>
    </div>
    <p class="text-sm text-muted-foreground">
      Don't have an account? <Button variant="link" href="/auth/register" class="p-0">Sign up!</Button>
    </p>
  </Card.Footer>
</Card.Root>
