/**
 * Focus management utilities for accessibility
 */

/**
 * Traps focus within a container (for modals, dialogs, dropdowns)
 * Returns a cleanup function that removes the event listener
 *
 * @example
 * ```svelte
 * <script>
 *   import { focus } from 'alus';
 *   let modalElement;
 *
 *   function openModal() {
 *     modalElement.showModal();
 *     const cleanup = focus.trap(modalElement);
 *     // Store cleanup to call when modal closes
 *   }
 * </script>
 *
 * <dialog bind:this={modalElement}>
 *   <!-- Content -->
 * </dialog>
 * ```
 */
export function trap(container: HTMLElement): () => void {
	const focusableElements = container.querySelectorAll(
		'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
	);
	const firstElement = focusableElements[0] as HTMLElement;
	const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

	const handleTabKey = (e: KeyboardEvent) => {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) {
			if (document.activeElement === firstElement) {
				e.preventDefault();
				lastElement?.focus();
			}
		} else {
			if (document.activeElement === lastElement) {
				e.preventDefault();
				firstElement?.focus();
			}
		}
	};

	container.addEventListener('keydown', handleTabKey);
	return () => container.removeEventListener('keydown', handleTabKey);
}

/**
 * Moves focus to first focusable element in container
 *
 * @example
 * ```svelte
 * <script>
 *   import { focus } from 'alus';
 *   let dialogElement;
 *
 *   function open() {
 *     dialogElement.showModal();
 *     focus.focusFirst(dialogElement);
 *   }
 * </script>
 * ```
 */
export function focusFirst(container: HTMLElement): void {
	const focusable = container.querySelector<HTMLElement>(
		'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
	);
	focusable?.focus();
}

/**
 * Moves focus to last focusable element in container
 */
export function focusLast(container: HTMLElement): void {
	const focusable = container.querySelectorAll<HTMLElement>(
		'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
	);
	const last = focusable[focusable.length - 1];
	last?.focus();
}

/**
 * Checks if an element can receive focus
 */
export function isFocusable(element: HTMLElement): boolean {
	if (
		element instanceof HTMLButtonElement ||
		element instanceof HTMLInputElement ||
		element instanceof HTMLSelectElement ||
		element instanceof HTMLTextAreaElement
	) {
		return !element.disabled && element.tabIndex >= 0;
	}

	if (element instanceof HTMLAnchorElement) {
		return element.href !== '';
	}

	return element.tabIndex >= 0;
}
