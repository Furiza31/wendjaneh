<script lang="ts">
  import * as Button from "$lib/components/ui/button/index";

  let { ref = $bindable(null), ...restProps }: Button.Props = $props();
</script>

<Button.Root bind:ref type="submit" {...restProps} />
