<script lang="ts">
  import type { EasingFunction, TransitionConfig } from "svelte/transition";

  import { page } from "$app/state";
  import { cubicIn } from "svelte/easing";

  const { duration = 150, children } = $props();

  type Params = {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
  };

  function scale(
    node: Element,
    { delay = 0, duration = 150, easing = cubicIn }: Params = {},
  ): TransitionConfig {
    return {
      delay,
      duration,
      easing,
      css: t => `
        opacity: ${t};
        transform: scale(${0.9 + 0.1 * t});
        filter: blur(${(1 - t) * 1.5}px);
        border-radius: ${(1 - t) * 10}px;
      `,
    };
  }
</script>

{#key page.url.pathname}
  <div
    in:scale={{ duration, delay: duration }}
    out:scale={{ duration }}
    class="w-full h-full bg-accent"
  >
    {@render children()}
  </div>
{/key}
