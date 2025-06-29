<script lang="ts">
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button/index";
  import * as Card from "$lib/components/ui/card/index";

  const error = page.url.searchParams.get("error") || "Unknown error";
</script>

<section class="flex flex-col items-center justify-center h-full p-4">
  <Card.Root class="w-full max-w-sm flex flex-col gap-4">
    <Card.Header class="flex flex-col justify-center items-center gap-1">
      <Card.Title class="text-2xl font-bold text-center">Error</Card.Title>
      <p class="text-muted-foreground text-center">
        An error occurred while trying to log you in. Please try again.
      </p>
    </Card.Header>
    <Card.Content>
      <p class="text-destructive text-center">{error}</p>
    </Card.Content>
    <Card.Footer class="flex flex-col items-center gap-2">
      <Button href="/auth/login" class="w-full">
        Go back to login
      </Button>
    </Card.Footer>
  </Card.Root>
</section>
