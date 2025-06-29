<script lang="ts">
  import { signOut } from "$lib/stores/auth";
</script>

<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onclick={async () => {
    await signOut();
  }}
>
  Logout
</button>
