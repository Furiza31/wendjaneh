<script lang="ts">
  import { micah } from "@dicebear/collection";
  import { createAvatar } from "@dicebear/core";
  import * as Avatar from "$lib/components/ui/avatar/index.js";

  import type { LayoutData } from "./$types";

  const { data }: { data: LayoutData } = $props();

  const avatar = createAvatar(micah, {
    seed: data.session.user.email,
  });

  const src = avatar.toDataUri();
</script>

<Avatar.Root>
  <Avatar.Image {src} alt="@shadcn" />
  <Avatar.Fallback>ME</Avatar.Fallback>
</Avatar.Root>
