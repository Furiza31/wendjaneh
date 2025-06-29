<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import * as Card from "$lib/components/ui/card";

  import type { PageData } from "./$types";

  import RegisterForm from "./register-form.svelte";

  const { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Register</title>
  <meta name="description" content="Create a new account" />
</svelte:head>

<section class="flex flex-col items-center justify-center h-full p-4">
  <Card.Root class="w-full max-w-sm flex flex-col gap-2">
    <Card.Header class="flex flex-col justify-center items-center gap-1">
      <Card.Title class="text-2xl font-bold text-center">New here ?</Card.Title>
      <p class="text-muted-foreground text-balance text-center">
        Create an account to continue
      </p>
    </Card.Header>
    <Card.Content>
      <RegisterForm {data} />
    </Card.Content>
    <Card.Footer class="flex flex-col items-center gap-2">
      <p class="text-sm text-muted-foreground">
        Already have an account? <Button variant="link" href="/auth/login" class="p-0">Log in!</Button>
      </p>
    </Card.Footer>
  </Card.Root>
</section>
