<script lang="ts">
  import "../app.css";
  import Transition from "./transition.svelte";

  const { children } = $props();
</script>

<main class="w-full h-full bg-accent-foreground">
  <Transition>
    {@render children()}
  </Transition>
</main>
