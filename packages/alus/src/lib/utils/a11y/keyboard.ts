/**
 * Keyboard event utilities for accessibility
 */

/**
 * Checks if Enter or Space was pressed (for button-like behavior)
 *
 * @example
 * ```svelte
 * <script>
 *   import { keyboard } from 'alus-ui';
 *
 *   function handleKeydown(e: KeyboardEvent) {
 *     if (keyboard.isActivationKey(e)) {
 *       // Activate button
 *     }
 *   }
 * </script>
 * ```
 */
export function isActivationKey(event: KeyboardEvent): boolean {
	return event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar';
}

/**
 * Checks if Escape was pressed
 */
export function isEscape(event: KeyboardEvent): boolean {
	return event.key === 'Escape';
}

/**
 * Checks if Arrow key was pressed
 */
export function isArrow(event: KeyboardEvent): boolean {
	return (
		event.key === 'ArrowUp' ||
		event.key === 'ArrowDown' ||
		event.key === 'ArrowLeft' ||
		event.key === 'ArrowRight'
	);
}

/**
 * Checks if Home or End was pressed
 */
export function isHomeEnd(event: KeyboardEvent): boolean {
	return event.key === 'Home' || event.key === 'End';
}

/**
 * Checks if Page Up or Page Down was pressed
 */
export function isPageUpDown(event: KeyboardEvent): boolean {
	return event.key === 'PageUp' || event.key === 'PageDown';
}

/**
 * Prevents default behavior for activation keys (Space key scrolling)
 *
 * @example
 * ```svelte
 * <div
 *   role="button"
 *   onkeydown={(e) => {
 *     keyboard.preventActivation(e);
 *     if (keyboard.isActivationKey(e)) {
 *       // Handle activation
 *     }
 *   }}
 * >
 *   Custom Button
 * </div>
 * ```
 */
export function preventActivation(event: KeyboardEvent): void {
	if (event.key === ' ' || event.key === 'Spacebar') {
		event.preventDefault();
	}
}

/**
 * Gets the direction from an arrow key event
 */
export function getArrowDirection(event: KeyboardEvent): 'up' | 'down' | 'left' | 'right' | null {
	switch (event.key) {
		case 'ArrowUp':
			return 'up';
		case 'ArrowDown':
			return 'down';
		case 'ArrowLeft':
			return 'left';
		case 'ArrowRight':
			return 'right';
		default:
			return null;
	}
}

/**
 * Keyboard event handler utility object
 */
export const keyboard = {
	isActivationKey,
	isEscape,
	isArrow,
	isHomeEnd,
	isPageUpDown,
	preventActivation,
	getArrowDirection
};
