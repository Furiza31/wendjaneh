<script lang="ts">
  import { type BreadcrumbItem } from "$lib/breadcrumb";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index";
  import { buttonVariants } from "$lib/components/ui/button/index";
  import * as Drawer from "$lib/components/ui/drawer/index";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import { useSidebar } from "$lib/components/ui/sidebar";

  const ITEMS_TO_DISPLAY = 3;

  let open = $state(false);

  const { isMobile } = useSidebar();

  const { items }: { items: BreadcrumbItem[] } = $props();
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    {#if items.length > ITEMS_TO_DISPLAY}
      <Breadcrumb.Item>
        {#if !isMobile}
          <DropdownMenu.Root bind:open>
            <DropdownMenu.Trigger
              class="flex items-center gap-1"
              aria-label="Toggle menu"
            >
              <Breadcrumb.Ellipsis class="size-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              {#each items.slice(1, -2) as item, i (i)}
                <DropdownMenu.Item>
                  <a href={item.href ? item.href : "#"}>
                    {item.label}
                  </a>
                </DropdownMenu.Item>
              {/each}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {:else}
          <Drawer.Root bind:open>
            <Drawer.Trigger aria-label="Toggle Menu">
              <Breadcrumb.Ellipsis class="size-4" />
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header class="text-left">
                <Drawer.Title>Navigate to</Drawer.Title>
                <Drawer.Description>
                  Select a page to navigate to.
                </Drawer.Description>
              </Drawer.Header>
              <div class="grid gap-1 px-4">
                {#each items.slice(1, -2) as item, i (i)}
                  <a href={item.href ? item.href : "#"} class="py-1 text-sm">
                    {item.label}
                  </a>
                {/each}
              </div>
              <Drawer.Footer class="pt-4">
                <Drawer.Close class={buttonVariants({ variant: "outline" })}>
                  Close
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        {/if}
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
    {/if}

    {#each items.slice(-ITEMS_TO_DISPLAY + 1) as item, index (item.label)}
      <Breadcrumb.Item>
        {#if item.href}
          <Breadcrumb.Link
            href={item.href}
            class="max-w-20 truncate md:max-w-none"
          >
            {item.label}
          </Breadcrumb.Link>
          {#if index < items.slice(-ITEMS_TO_DISPLAY + 1).length - 1}
            <Breadcrumb.Separator />
          {/if}
        {:else}
          <Breadcrumb.Page class="max-w-20 truncate md:max-w-none">
            {item.label}
          </Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
