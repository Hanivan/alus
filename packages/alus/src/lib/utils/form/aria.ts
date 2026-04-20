/**
 * ARIA attribute utilities for form fields
 * @module form/aria
 */

import { buildAriaAttrs } from '$utils/a11y/aria.js';

/**
 * Props for a form field with label and error states
 */
export interface FieldProps {
	id?: string;
	label?: string;
	description?: string;
	descriptionId?: string;
	error?: string;
	errorId?: string;
	required?: boolean;
	invalid?: boolean;
}

/**
 * Build aria-describedby value from description and error IDs
 * @param descriptionId - Description element ID
 * @param errorId - Error element ID
 * @returns Space-separated IDs for aria-describedby
 */
function buildDescribedBy(
	descriptionId?: string,
	errorId?: string
): string | undefined {
	const ids: string[] = [];
	if (descriptionId) ids.push(descriptionId);
	if (errorId) ids.push(errorId);
	return ids.length > 0 ? ids.join(' ') : undefined;
}

/**
 * Generate ARIA attributes for a form field based on its state
 * @param props - Field properties
 * @returns ARIA attributes object
 *
 * @example
 * ```svelte
 * <script>
 *   import { getFieldAriaAttrs } from 'alus/utils/form';
 *
 *   const aria = getFieldAriaAttrs({
 *     descriptionId: 'help-id',
 *     errorId: 'error-id',
 *     invalid: true
 *   });
 * </script>
 *
 * <Input {...aria} />
 * ```
 */
export function getFieldAriaAttrs(props: FieldProps): Record<string, string> {
	return buildAriaAttrs({
		'aria-label': props.label,
		'aria-describedby': buildDescribedBy(props.descriptionId || props.description, props.errorId || props.error),
		'aria-invalid': props.invalid || hasError(props.error),
		'aria-required': props.required
	});
}

/**
 * Check if a field has an error state
 * @param error - Error message or boolean
 * @returns Whether the field is invalid
 */
export function hasError(error?: string | boolean): boolean {
	return error === true || (typeof error === 'string' && error.length > 0);
}

/**
 * Get the error message to display
 * @param error - Error message or boolean
 * @returns Error string or undefined
 */
export function getErrorMessage(error?: string | boolean): string | undefined {
	if (typeof error === 'string') {
		return error || undefined;
	}
	return undefined;
}

/**
 * Common ARIA roles for form feedback
 */
export const fieldRoles = {
	/** Role for an alert message */
	alert: 'alert',
	/** Role for status information */
	status: 'status'
} as const;

/**
 * Type for ARIA field roles
 */
export type FieldRole = typeof fieldRoles[keyof typeof fieldRoles];
