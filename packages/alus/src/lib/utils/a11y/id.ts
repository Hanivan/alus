/**
 * ID generation utilities for accessibility associations
 */

let counter = 0;

/**
 * Creates a unique ID for accessibility associations
 * Useful for generating IDs for aria-describedby, aria-labelledby, etc.
 *
 * @param prefix - Descriptive prefix for the ID (e.g., 'label', 'desc', 'error')
 * @returns A unique ID string
 *
 * @example
 * ```svelte
 * <script>
 *   import { generateId } from 'alus-ui';
 *
 *   const labelId = generateId('label');
 *   const errorId = generateId('error');
 * </script>
 *
 * <Input id="email" {...labelAttrs({ labelledby: labelId, describedby: errorId })} />
 * <label {for}>Email</label>
 * <p id={errorId} role="alert">{error}</p>
 * ```
 */
export function generateId(prefix: string): string {
	return `alus-${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Creates a sequential ID (useful for lists, radios, checkboxes)
 *
 * @param prefix - Descriptive prefix for the ID
 * @returns A sequential ID string
 *
 * @example
 * ```svelte
 * {#each items as item, i}
 *   <Radio id={generateSequentialId('option', i)} />
 * {/each}
 * ```
 */
export function generateSequentialId(prefix: string, index: number): string {
	return `alus-${prefix}-${index}`;
}

/**
 * Creates a counter-based ID (guaranteed unique per session)
 *
 * @param prefix - Descriptive prefix for the ID
 * @returns A unique counter-based ID
 */
export function generateCounterId(prefix: string): string {
	return `alus-${prefix}-${counter++}`;
}

/**
 * ID generation utilities object
 */
export const id = {
	generate: generateId,
	sequential: generateSequentialId,
	counter: generateCounterId
};
