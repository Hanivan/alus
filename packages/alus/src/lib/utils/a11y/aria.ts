/**
 * ARIA attribute utilities for WCAG compliance
 */
import type {
	LabelConfig,
	ValidationConfig,
	InteractiveStateConfig,
	WidgetConfig,
	AriaHaspopup,
	AriaLive,
	AriaOrientation
} from '$types/index.js';

/**
 * Builds ARIA attributes object from a partial record, filtering out undefined values
 * and converting boolean/number/undefined values to strings for HTML attributes
 *
 * @example
 * ```ts
 * const attrs = buildAriaAttrs({
 *   'aria-label': 'Close',
 *   'aria-expanded': false,
 *   'aria-valuenow': 50,
 *   'aria-hidden': undefined
 * });
 * // { 'aria-label': 'Close', 'aria-expanded': 'false', 'aria-valuenow': '50' }
 * ```
 */
export function buildAriaAttrs(
	attrs: Record<string, string | number | boolean | undefined>
): Record<string, string> {
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(attrs)) {
		if (value !== undefined) {
			result[key] = String(value);
		}
	}
	return result;
}

/**
 * Creates ARIA attributes for labeling and describing elements
 *
 * @example
 * ```svelte
 * <Input
 *   id="email"
 *   {...labelAttrs({ label: 'Email address' })}
 * />
 * ```
 */
export function labelAttrs(options: LabelConfig = {}) {
	return buildAriaAttrs({
		'aria-label': options.label,
		'aria-labelledby': options.labelledby,
		'aria-describedby': options.describedby
	});
}

/**
 * Creates ARIA attributes for form validation states
 *
 * @example
 * ```svelte
 * <Input
 *   bind:value={email}
 *   {...validationAttrs({ invalid: !isValid, errormessage: 'email-error' })}
 * />
 * <p id="email-error" role="alert">{error}</p>
 * ```
 */
export function validationAttrs(options: ValidationConfig = {}) {
	return buildAriaAttrs({
		'aria-invalid': options.invalid,
		'aria-required': options.required,
		'aria-errormessage': options.errormessage
	});
}

/**
 * Creates ARIA attributes for interactive element states
 *
 * @example
 * ```svelte
 * <Button
 *   onclick={() => pressed = !pressed}
 *   {...interactiveStateAttrs({ pressed })}
 * >
 *   Toggle
 * </Button>
 * ```
 */
export function interactiveStateAttrs(options: InteractiveStateConfig = {}) {
	return buildAriaAttrs({
		'aria-pressed': options.pressed,
		'aria-expanded': options.expanded,
		'aria-checked': options.checked,
		'aria-disabled': options.disabled,
		'aria-busy': options.busy
	});
}

/**
 * Creates ARIA attributes for complex widgets and roles
 *
 * @example
 * ```svelte
 * <div role="slider" {...widgetAttrs({
 *   valuenow: value,
 *   valuemin: 0,
 *   valuemax: 100
 * })} />
 * ```
 */
export function widgetAttrs(options: WidgetConfig = {}) {
	return buildAriaAttrs({
		'aria-controls': options.controls,
		'aria-haspopup': options.haspopup,
		'aria-valuenow': options.valuenow,
		'aria-valuetext': options.valuetext,
		'aria-valuemin': options.valuemin,
		'aria-valuemax': options.valuemax,
		'aria-live': options.live,
		'aria-activedescendant': options.activedescendant,
		'aria-posinset': options.posinset,
		'aria-setsize': options.setsize,
		'aria-level': options.level,
		'aria-orientation': options.orientation
	});
}

/**
 * Combines multiple ARIA attribute objects into one
 * Useful for composing different accessibility patterns
 *
 * @example
 * ```svelte
 * <button {...mergeAttrs(
 *   labelAttrs({ label: 'Menu' }),
 *   interactiveStateAttrs({ expanded: isOpen }),
 *   widgetAttrs({ haspopup: 'menu', controls: 'menu-id' })
 * )}>
 *   Menu
 * </button>
 * ```
 */
export function mergeAttrs(...attrSets: Record<string, string>[]): Record<string, string> {
	return Object.assign({}, ...attrSets);
}
