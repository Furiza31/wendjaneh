<script lang="ts">
  import "../app.css";

  import type { Snippet } from "svelte";

  const { children }: { children: Snippet } = $props();
</script>

<main class="w-full h-full bg-accent-foreground">
  <section class="w-full h-full bg-accent">
    {@render children()}
  </section>
</main>
