<script lang="ts">
  import type { Snippet } from "svelte";

  import type { LayoutData } from "./$types";
  const { children }: { children: Snippet; data: LayoutData } = $props();
</script>

<header class="w-full bg-card text-card-foreground border p-2 flex items-center justify-between">
  {@render children?.()}
</header>
