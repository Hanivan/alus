/**
 * Form field state management
 * @module form/state
 */

/**
 * Form field state interface
 */
export interface FormFieldState<T = string> {
	value: T;
	error: string | undefined;
	touched: boolean;
	dirty: boolean;
}

/**
 * Create a reactive form field state
 * @param initialValue - Initial value for the field
 * @returns Form field state object
 *
 * @example
 * ```svelte
 * <script>
 *   import { createFormField } from 'alus-ui/utils/form';
 *
 *   let email = createFormField('');
 * </script>
 *
 * <Input
 *   bind:value={email.value}
 *   aria-invalid={email.error !== undefined}
 *   onblur={() => email.touched = true}
 * />
 *
 * {#if email.error && email.touched}
 *   <p class="error">{email.error}</p>
 * {/if}
 * ```
 */
export function createFormField<T = string>(initialValue: T): FormFieldState<T> {
	return {
		value: initialValue,
		error: undefined,
		touched: false,
		dirty: false
	};
}

/**
 * Form state manager for multiple fields
 */
export interface FormState<T extends Record<string, unknown>> {
	values: T;
	errors: Record<keyof T, string | undefined>;
	touched: Record<keyof T, boolean>;
	dirty: Record<keyof T, boolean>;
}

/**
 * Create a form state manager
 * @param initialValues - Initial values for all fields
 * @returns Form state object
 *
 * @example
 * ```svelte
 * <script>
 *   import { createFormState } from 'alus-ui/utils/form';
 *
 *   let form = createFormState({
 *     email: '',
 *     password: '',
 *     terms: false
 *   });
 * </script>
 *
 * <Input bind:value={form.values.email} />
 * <Input bind:value={form.values.password} />
 * ```
 */
export function createFormState<T extends Record<string, unknown>>(initialValues: T): FormState<T> {
	const keys = Object.keys(initialValues) as Array<keyof T>;

	const touched = {} as Record<keyof T, boolean>;
	const dirty = {} as Record<keyof T, boolean>;
	const errors = {} as Record<keyof T, string | undefined>;

	for (const key of keys) {
		touched[key] = false;
		dirty[key] = false;
		errors[key] = undefined;
	}

	return {
		values: initialValues,
		errors,
		touched,
		dirty
	};
}

/**
 * Check if form has any errors
 * @param form - Form state object
 * @returns Whether any field has an error
 */
export function hasFormErrors<T extends Record<string, unknown>>(form: FormState<T>): boolean {
	return Object.values(form.errors).some((error) => error !== undefined);
}

/**
 * Check if form is valid (no errors and all required fields touched)
 * @param form - Form state object
 * @returns Whether form is valid
 */
export function isFormValid<T extends Record<string, unknown>>(form: FormState<T>): boolean {
	return !hasFormErrors(form) && Object.values(form.touched).every((t) => t);
}

/**
 * Reset form to initial state
 * @param form - Form state object
 * @param initialValues - Initial values to reset to
 */
export function resetForm<T extends Record<string, unknown>>(
	form: FormState<T>,
	initialValues: T
): void {
	for (const key of Object.keys(initialValues) as Array<keyof T>) {
		(form.values as Record<keyof T, unknown>)[key] = initialValues[key];
		form.errors[key] = undefined;
		form.touched[key] = false;
		form.dirty[key] = false;
	}
}
