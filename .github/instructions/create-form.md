# 📝 How to Implement a Generic Form in SvelteKit

**Goal:**
Implement a generic form (e.g., contact, feedback, profile update) in a SvelteKit project using shadcn-svelte components, Tailwind CSS, Zod4 validation, and sveltekit-superforms.

---

## 1. **Create the Zod Schema for Validation**

**File:**
`/src/routes/[your-page]/schema.ts`

**Example:**

```typescript
import * as z from "zod/v4";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type FormSchema = typeof formSchema;
```

---

## 2. **Create the Form Component**

**File:**
`/src/routes/[your-page]/form-[your-form].svelte`

**Example:**

```svelte
<script lang="ts">
  import * as Form from "$lib/components/ui/form/";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { type Infer, superForm, type SuperValidated } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";

  import { formSchema, type FormSchema } from "./schema";

  const { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();
  const form = superForm(data.form, { validators: zod4Client(formSchema) });
  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex flex-col gap-4" action="?/contact">
  <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Name</Form.Label>
        <Input {...props} bind:value={$formData.name} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="message">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Message</Form.Label>
        <Textarea {...props} bind:value={$formData.message} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Send</Form.Button>
</form>
```

---

## 3. **Server-Side Loader for Form Validation**

**File:**
`/src/routes/[your-page]/+page.server.ts`

**Example:**

```typescript
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

import type { PageServerLoad } from "./$types";

import { formSchema } from "./schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  };
};
```

---

## 4. **Page Integration**

**File:**
`/src/routes/[your-page]/+page.svelte`

**Example:**

```svelte
<script lang="ts">
  import type { PageData } from "./$types";

  import FormComponent from "./form.svelte";
  const { data }: { data: PageData } = $props();
</script>

<section class="max-w-lg mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Contact Us</h1>
  <FormComponent {data} />
</section>
```

---

## 5. **Form action**

**File:**
`/src/routes/[your-page]/+page.server.ts`

**Example:**

```typescript
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

import type { Actions, PageServerLoad } from "./$types";

import { formSchema } from "./schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  };
};

export const actions: Actions = {
  contact: async (event) => {
    const form = await superValidate(event, zod4(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    // Handle form submission logic here, e.g., send an email or save to a database

    return {
      form,
    };
  },
};
```

---

## 6. **Directory Structure Example**

```sh
src/
└── routes/
    └── contact/
        ├── +page.svelte
        ├── +page.server.ts
        ├── form-contact.svelte
        └── schema.ts
```

---

**Summary:**

- Define your form schema with Zod in `schema.ts`.
- Build the form UI in `form-contact.svelte` using shadcn-svelte and Tailwind.
- Load and validate the form server-side in `+page.server.ts`.
- Integrate the form in your page with `+page.svelte`.
- Place files as shown in the directory structure.

**Docs:**

- [SvelteKit Superforms](https://superforms.rocks/get-started/zod4)
- [Zod v4 Documentation](https://zod.dev/v4)
- [shadcn-svelte Components](https://www.shadcn-svelte.com/docs/components)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs/introduction)
