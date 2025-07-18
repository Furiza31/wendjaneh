<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { Button } from "$lib/components/ui/button/index";
  import { cn } from "$lib/utils.js";
  import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-svelte";

  import { useSidebar } from "./context.svelte.js";

  let {
    ref = $bindable(null),
    class: className,
    onclick,
    ...restProps
  }: ComponentProps<typeof Button> & {
    onclick?: (e: MouseEvent) => void;
  } = $props();

  const sidebar = useSidebar();
</script>

<Button
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  variant="ghost"
  size="icon"
  class={cn("size-7", className)}
  type="button"
  onclick={(e) => {
    onclick?.(e);
    sidebar.toggle();
  }}
  {...restProps}
>
  {#if sidebar.open && !sidebar.isMobile}
    <PanelLeftClose class="size-6" />
  {/if}
  {#if !sidebar.open && !sidebar.isMobile}
    <PanelLeftOpen class="size-6" />
  {/if}
  {#if sidebar.isMobile}
    <Menu class="size-6" />
  {/if}
  <span class="sr-only">Toggle Sidebar</span>
</Button>
