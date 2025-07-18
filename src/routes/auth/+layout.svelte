<script lang="ts">
  import type { Snippet } from "svelte";

  const { children }: { children: Snippet } = $props();
</script>

<section class="flex flex-col items-center justify-center h-full p-4">
  {@render children()}
</section>
