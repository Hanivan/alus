/**
 * Centralized TypeScript types for accessibility and form attributes
 * No more magic strings or numbers!
 */

/**
 * HTML5 autocomplete attribute values
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export type AutocompleteValue =
	| 'off'
	| 'on'
	| 'name'
	| 'honorific-prefix'
	| 'given-name'
	| 'additional-name'
	| 'family-name'
	| 'honorific-suffix'
	| 'nickname'
	| 'email'
	| 'username'
	| 'new-password'
	| 'current-password'
	| 'one-time-code'
	| 'organization-title'
	| 'organization'
	| 'street-address'
	| 'address-line1'
	| 'address-line2'
	| 'address-line3'
	| 'address-level4'
	| 'address-level3'
	| 'address-level2'
	| 'address-level1'
	| 'country'
	| 'country-name'
	| 'postal-code'
	| 'cc-name'
	| 'cc-given-name'
	| 'cc-additional-name'
	| 'cc-family-name'
	| 'cc-number'
	| 'cc-exp'
	| 'cc-exp-month'
	| 'cc-exp-year'
	| 'cc-csc'
	| 'cc-type'
	| 'transaction-currency'
	| 'transaction-amount'
	| 'language'
	| 'bday'
	| 'bday-day'
	| 'bday-month'
	| 'bday-year'
	| 'sex'
	| 'url'
	| 'photo';

/**
 * HTML input types
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * HTML inputmode attribute values
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
 */
export type InputMode =
	| 'none'
	| 'text'
	| 'tel'
	| 'url'
	| 'email'
	| 'numeric'
	| 'decimal'
	| 'search';

/**
 * HTML button types
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Form encoding types
 */
export type FormEncType =
	| 'application/x-www-form-urlencoded'
	| 'multipart/form-data'
	| 'text/plain';

/**
 * Form method types
 */
export type FormMethod = 'post' | 'get' | 'dialog';

/**
 * Form target types
 */
export type FormTarget = '_blank' | '_self' | '_parent' | '_top' | string;

/**
 * ARIA boolean values (can be string or boolean per ARIA spec)
 */
export type AriaBoolean = boolean | 'true' | 'false';

/**
 * ARIA tristate values (for checkboxes, etc.)
 */
export type AriaTristate = boolean | 'mixed' | 'true' | 'false';

/**
 * ARIA haspopup values
 */
export type AriaHaspopup =
	| boolean
	| 'false'
	| 'true'
	| 'menu'
	| 'listbox'
	| 'tree'
	| 'grid'
	| 'dialog';

/**
 * ARIA live region values
 */
export type AriaLive = 'polite' | 'assertive' | 'off';

/**
 * ARIA orientation values
 */
export type AriaOrientation = 'horizontal' | 'vertical';

/**
 * Common ID reference type
 */
export type IdReference = string;

/**
 * Direction type for arrow keys
 */
export type Direction = 'up' | 'down' | 'left' | 'right';

/**
 * Helper type to normalize ARIA boolean values
 * Converts string literals to actual booleans
 */
export type NormalizedAriaBoolean<T> = T extends 'true' | 'false' ? boolean : T;

/**
 * Helper to normalize ARIA tristate values
 */
export type NormalizedAriaTristate<T> = T extends 'true' | 'false' | 'mixed'
	? boolean | 'mixed'
	: T;

/**
 * Utility constants for common values
 */
export const CONSTANTS = {
	/** Default autocomplete values for common form fields */
	AUTOCOMPLETE: {
		EMAIL: 'email' as const,
		USERNAME: 'username' as const,
		PASSWORD: 'current-password' as const,
		NEW_PASSWORD: 'new-password' as const,
		NAME: 'name' as const,
		FIRST_NAME: 'given-name' as const,
		LAST_NAME: 'family-name' as const,
		PHONE: 'tel' as const,
		POSTAL_CODE: 'postal-code' as const
	} as const,

	/** Common button types */
	BUTTON_TYPE: {
		BUTTON: 'button' as const,
		SUBMIT: 'submit' as const,
		RESET: 'reset' as const
	} as const,

	/** Common input types */
	INPUT_TYPE: {
		TEXT: 'text' as const,
		EMAIL: 'email' as const,
		PASSWORD: 'password' as const,
		NUMBER: 'number' as const,
		TEL: 'tel' as const,
		URL: 'url' as const,
		SEARCH: 'search' as const
	} as const,

	/** Common input modes */
	INPUT_MODE: {
		NONE: 'none' as const,
		TEXT: 'text' as const,
		TEL: 'tel' as const,
		URL: 'url' as const,
		EMAIL: 'email' as const,
		NUMERIC: 'numeric' as const,
		DECIMAL: 'decimal' as const,
		SEARCH: 'search' as const
	} as const,

	/** Form encoding types */
	FORM_ENCTYPE: {
		URLENCODED: 'application/x-www-form-urlencoded' as const,
		MULTIPART: 'multipart/form-data' as const,
		TEXT: 'text/plain' as const
	} as const,

	/** Form method types */
	FORM_METHOD: {
		POST: 'post' as const,
		GET: 'get' as const,
		DIALOG: 'dialog' as const
	} as const,

	/** Form target types */
	FORM_TARGET: {
		BLANK: '_blank' as const,
		SELF: '_self' as const,
		PARENT: '_parent' as const,
		TOP: '_top' as const
	} as const,

	/** ARIA live values */
	ARIA_LIVE: {
		POLITE: 'polite' as const,
		ASSERTIVE: 'assertive' as const,
		OFF: 'off' as const
	} as const,

	/** ARIA orientation values */
	ARIA_ORIENTATION: {
		HORIZONTAL: 'horizontal' as const,
		VERTICAL: 'vertical' as const
	} as const,

	/** ARIA boolean values */
	ARIA_BOOLEAN: {
		TRUE: 'true' as const,
		FALSE: 'false' as const
	} as const,

	/** ARIA tristate values */
	ARIA_TRISTATE: {
		TRUE: 'true' as const,
		FALSE: 'false' as const,
		MIXED: 'mixed' as const
	} as const
} as const;

/**
 * Type helper to extract values from constants object
 */
export type ConstValue<T> = T extends { [K: string]: infer V } ? V : never;

/**
 * Common form field configuration types
 */
export interface FormFieldConfig {
	/** Field identifier */
	id?: string;
	/** Field name for form submission */
	name?: string;
	/** Whether the field is required */
	required?: boolean;
	/** Whether the field is disabled */
	disabled?: boolean;
	/** Whether the field is read-only */
	readonly?: boolean;
	/** Field label */
	label?: string;
	/** Field description/help text */
	description?: string;
	/** Error message */
	error?: string;
}

/**
 * Accessible label configuration
 */
export interface LabelConfig {
	/** Direct label for screen readers */
	label?: string;
	/** ID of element that labels this component */
	labelledby?: string;
	/** ID of element that describes this component */
	describedby?: string;
}

/**
 * Validation state configuration
 */
export interface ValidationConfig {
	/** Whether the value is invalid */
	invalid?: boolean;
	/** Whether the field is required */
	required?: boolean;
	/** ID of element containing error message */
	errormessage?: string;
}

/**
 * Interactive state configuration
 */
export interface InteractiveStateConfig {
	/** Toggle button pressed state */
	pressed?: boolean | 'mixed';
	/** Expanded/collapsed state */
	expanded?: boolean;
	/** Checkbox/switch checked state */
	checked?: boolean | 'mixed';
	/** Disabled state */
	disabled?: boolean;
	/** Busy/loading state */
	busy?: boolean;
}

/**
 * Widget-specific configuration
 */
export interface WidgetConfig {
	/** Element that this controls */
	controls?: string;
	/** Popup behavior */
	haspopup?: AriaHaspopup;
	/** Current value within a range */
	valuenow?: number;
	/** Text representation of value */
	valuetext?: string;
	/** Minimum value */
	valuemin?: number;
	/** Maximum value */
	valuemax?: number;
	/** Live region behavior */
	live?: AriaLive;
	/** Element ID that receives focus */
	activedescendant?: string;
	/** Current position in a list */
	posinset?: number;
	/** Total items in a list */
	setsize?: number;
	/** Heading level */
	level?: number;
	/** Orientation */
	orientation?: AriaOrientation;
}
