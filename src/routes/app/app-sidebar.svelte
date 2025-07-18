<script lang="ts">
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button/index";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import { signOut } from "$lib/stores/auth";
  import { ChevronUp, House, ListTodo, LogOut, Settings } from "lucide-svelte";

  import type { LayoutData } from "./$types";

  import Avatar from "./avatar.svelte";

  const { data }: { data: LayoutData } = $props();

  const items = [
    {
      title: "Home",
      url: "/app",
      icon: House,
    },
    {
      title: "Tasks",
      url: "/app/tasks",
      icon: ListTodo,
    },
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Menu</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive={page.url.pathname === item.url}>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuButton
                {...props}
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar {data} />
                {data.session.user.name}
                <ChevronUp class="ml-auto" />
              </Sidebar.MenuButton>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            side="top"
            class="w-(--bits-dropdown-menu-anchor-width)"
          >
            <DropdownMenu.Item>
              <Settings />
              <span>Settings</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              {#snippet child({ props })}
                <Button
                  {...props}
                  variant="destructive"
                  onclick={async () => {
                    await signOut();
                  }}
                  class="w-full justify-start px-2 py-1.5 h-fit"
                >
                  <LogOut />
                  <span>Sign out</span>
                </Button>
              {/snippet}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
