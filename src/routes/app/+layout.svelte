<script lang="ts">
  import type { Snippet } from "svelte";

  import { page } from "$app/state";
  import { createBreadcrumb } from "$lib/breadcrumb";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  import type { LayoutData } from "./$types";

  import AppSidebar from "./app-sidebar.svelte";
  import Breadcrumb from "./breadcrumb.svelte";
  import Header from "./header.svelte";

  const { children, data }: { children: Snippet; data: LayoutData } = $props();

  const items = $derived(createBreadcrumb(page.url.pathname) || []);
</script>

<Sidebar.Provider>
  <AppSidebar {data} />
  <section class="w-full h-full">
    <Header {data}>
      <Sidebar.Trigger class="p-4" />
      <Breadcrumb {items} />
    </Header>
    {@render children?.()}
  </section>
</Sidebar.Provider>
