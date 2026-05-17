# Form Utilities

Reusable utilities for form field management and accessibility.

## Modules

### `ids.ts` - ID Generation

Generate consistent, accessible IDs for form fields.

```typescript
import { createFieldIds, createFieldGroupIds } from 'alus/utils/form';

const ids = createFieldIds('email');
// { label: 'alus-email-abc123-label', input: 'alus-email-abc123-input', ... }

const groupIds = createFieldGroupIds('password');
// { group: 'alus-password-abc123-group', label: 'alus-password-abc123-label', ... }
```

### `aria.ts` - ARIA Attributes

Build proper ARIA attributes for form fields.

```typescript
import { getFieldAriaAttrs, hasError, getErrorMessage } from 'alus/utils/form';

const aria = getFieldAriaAttrs({
	descriptionId: 'help-text',
	errorId: 'error-message',
	invalid: true
});
// { 'aria-describedby': 'help-text error-message', 'aria-invalid': true }

hasError('Some error'); // true
getErrorMessage('Some error'); // 'Some error'
```

### `state.ts` - Form State Management

Create reactive form field and form state.

```typescript
import { createFormField, createFormState, hasFormErrors, isFormValid } from 'alus/utils/form';

// Single field
let email = createFormField('');
// { value: '', error: undefined, touched: false, dirty: false }

// Multiple fields (form)
let form = createFormState({
	email: '',
	password: '',
	terms: false
});
// { values: {...}, errors: {...}, touched: {...}, dirty: {...} }

hasFormErrors(form); // true if any errors
isFormValid(form); // true if valid and all touched
```

## Usage Examples

### Form Field with Accessibility

```svelte
<script lang="ts">
	import { Input } from 'alus';
	import { createFieldIds } from 'alus/utils/form';

	const ids = createFieldIds('email');

	let email = $state('');
	let emailError = $state(undefined);
	let emailTouched = $state(false);
</script>

<label for={ids.label}>Email Address</label>
<Input
	id={ids.input}
	bind:value={email}
	aria-describedby={ids.description}
	aria-invalid={emailError !== undefined}
	onblur={() => (emailTouched = true)}
/>
<p id={ids.description}>We'll never share your email</p>

{#if emailError && emailTouched}
	<p id={ids.error} class="error" role="alert">
		{emailError}
	</p>
{/if}
```

### Form State Manager

```svelte
<script lang="ts">
	import { Input, Checkbox } from 'alus';
	import { createFormState, isFormValid, hasFormErrors } from 'alus/utils/form';

	let form = createFormState({
		email: '',
		password: '',
		terms: false
	});

	function handleSubmit() {
		if (isFormValid(form)) {
			// Submit form
		}
	}
</script>

<Input bind:value={form.values.email} />
<Input bind:value={form.values.password} />
<Checkbox bind:checked={form.values.terms as boolean} />

<button disabled={!isFormValid(form)}>Submit</button>
```

## API Reference

### Functions

#### `createFieldIds(fieldName: string): FieldIds`

Generate IDs for a single form field.

#### `createFieldGroupIds(groupName: string): FieldIds & { group: string }`

Generate IDs for a field group (with group ID).

#### `getFieldAriaAttrs(props: FieldProps): Record<string, string | boolean>`

Generate ARIA attributes for a form field.

#### `hasError(error?: string | boolean): boolean`

Check if a field has an error.

#### `getErrorMessage(error?: string | boolean): string | undefined`

Extract error message from error value.

#### `createFormField<T>(initialValue: T): FormFieldState<T>`

Create state for a single form field.

#### `createFormState<T>(initialValues: T): FormState<T>`

Create state for an entire form.

#### `hasFormErrors(form: FormState): boolean`

Check if form has any errors.

#### `isFormValid(form: FormState): boolean`

Check if form is valid (no errors, all touched).

#### `resetForm(form: FormState, initialValues: T): void`

Reset form to initial state.
