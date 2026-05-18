/**
 * ID generation utilities for form fields
 * @module form/ids
 */

import { generateId } from '$utils/a11y/index.js';

/**
 * IDs for form field accessibility associations
 */
export interface FieldIds {
	label: string;
	input: string;
	description: string;
	error: string;
}

/**
 * Generate consistent IDs for form labels and descriptions
 * @param fieldName - Name of the field (used as prefix for IDs)
 * @returns Object with label, input, description, and error IDs
 *
 * @example
 * ```svelte
 * <script>
 *   import { createFieldIds } from 'alus-ui/utils/form';
 *
 *   const ids = createFieldIds('email');
 * </script>
 *
 * <label for={ids.label}>Email</label>
 * <Input id={ids.input} aria-describedby={ids.description} />
 * <p id={ids.description}>Enter your email</p>
 * ```
 */
export function createFieldIds(fieldName: string): FieldIds {
	const base = generateId(fieldName);
	return {
		label: `${base}-label`,
		input: `${base}-input`,
		description: `${base}-description`,
		error: `${base}-error`
	};
}

/**
 * Generate IDs for a form field group
 * @param groupName - Name of the field group
 * @returns Object with group and field IDs
 *
 * @example
 * ```svelte
 * const ids = createFieldGroupIds('password');
 * // { group: 'alus-ui-password-xyz-group', field: 'alus-ui-password-xyz-field', ... }
 * ```
 */
export function createFieldGroupIds(groupName: string): FieldIds & { group: string } {
	const base = generateId(groupName);
	return {
		group: `${base}-group`,
		label: `${base}-label`,
		input: `${base}-input`,
		description: `${base}-description`,
		error: `${base}-error`
	};
}
