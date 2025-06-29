<script lang="ts">
  import * as Alert from "$lib/components/ui/alert/index";
  import * as Form from "$lib/components/ui/form/";
  import { Input } from "$lib/components/ui/input";
  import { credentialRegister, sending } from "$lib/stores/auth";
  import { AlertCircleIcon, LoaderCircle } from "lucide-svelte";
  import { type Infer, superForm, type SuperValidated } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";

  import { formSchema, type FormSchema } from "./schema";

  const { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

  let error = $state<string | null>(null);

  const form = superForm(data.form, {
    validators: zod4Client(formSchema),
    async onSubmit({ cancel, formData }) {
      cancel();
      error = null;

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      const response = await zod4Client(formSchema).validate({
        name,
        email,
        password,
        confirmPassword,
      });

      if (!response.success) {
        return;
      }

      try {
        await credentialRegister({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
        });
      }
      catch (e: unknown) {
        error = e as string;
      }
    },
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex flex-col gap-2" action="?/register">
  <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Username</Form.Label>
        <Input {...props} bind:value={$formData.name} placeholder="John Doe" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} bind:value={$formData.email} type="email" placeholder="john@example.com" required />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input {...props} bind:value={$formData.password} type="password" placeholder="••••••••" required />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="confirmPassword">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Confirm Password</Form.Label>
        <Input {...props} bind:value={$formData.confirmPassword} type="password" placeholder="••••••••" required />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  {#if error}
    <Alert.Root variant="destructive" class="mb-1.5">
      <AlertCircleIcon />
      <Alert.Title>
        <p>{error}</p>
      </Alert.Title>
    </Alert.Root>
  {/if}
  <Form.Button disabled={$sending}>
    {#if $sending}
      <LoaderCircle class="animate-spin" />
    {:else}
      Submit
    {/if}
  </Form.Button>
</form>
