# Accessibility Utilities

Reusable accessibility utilities for WCAG compliance and ARIA attributes.

## Installation

```ts
import {
	labelAttrs,
	validationAttrs,
	interactiveStateAttrs,
	widgetAttrs,
	mergeAttrs
} from 'alus-ui/a11y';
```

## ARIA Attribute Builders

### `labelAttrs(options)`

Creates ARIA attributes for labeling and describing elements.

```svelte
<script>
	import { Input, labelAttrs } from 'alus-ui';
</script>

<!-- Using aria-label -->
<Input {...labelAttrs({ label: 'Email address' })} />

<!-- Using aria-labelledby -->
<Input id="email" {...labelAttrs({ labelledby: 'email-label' })} />
<label id="email-label" for="email">Email</label>

<!-- Using aria-describedby -->
<Input
	{...labelAttrs({
		label: 'Password',
		describedby: 'password-help'
	})}
/>
<p id="password-help">Must be at least 8 characters</p>
```

### `validationAttrs(options)`

Creates ARIA attributes for form validation states.

```svelte
<script>
	import { Input, validationAttrs } from 'alus-ui';
	let email = $state('');
	let error = $state('');
</script>

<Input
	bind:value={email}
	{...validationAttrs({
		invalid: !!error,
		errormessage: 'email-error'
	})}
/>
{#if error}
	<p id="email-error" role="alert">{error}</p>
{/if}
```

### `interactiveStateAttrs(options)`

Creates ARIA attributes for interactive element states.

```svelte
<script>
	import { Button, interactiveStateAttrs } from 'alus-ui';
	let pressed = $state(false);
	let expanded = $state(false);
</script>

<!-- Toggle button -->
<Button onclick={() => (pressed = !pressed)} {...interactiveStateAttrs({ pressed })}>Toggle</Button>

<!-- Expandable button -->
<Button onclick={() => (expanded = !expanded)} {...interactiveStateAttrs({ expanded })}>
	{expanded ? 'Collapse' : 'Expand'}
</Button>
```

### `widgetAttrs(options)`

Creates ARIA attributes for complex widgets and roles.

```svelte
<script>
	import { widgetAttrs } from 'alus-ui';
	let value = $state(50);
</script>

<div
	role="slider"
	{...widgetAttrs({
		valuenow: value,
		valuemin: 0,
		valuemax: 100
	})}
>
	Slider
</div>
```

### `mergeAttrs(...attrSets)`

Combines multiple ARIA attribute objects into one.

```svelte
<script>
	import { mergeAttrs, labelAttrs, interactiveStateAttrs } from 'alus-ui';
</script>

<button {...mergeAttrs(labelAttrs({ label: 'Menu' }), interactiveStateAttrs({ expanded: true }))}>
	Menu
</button>
```

## Focus Management

```ts
import { focus } from 'alus-ui/a11y';

// Trap focus within a container (for modals, dropdowns)
const cleanup = focus.trap(modalElement);
// Call cleanup() when modal closes

// Focus first element
focus.focusFirst(dialogElement);

// Focus last element
focus.focusLast(dialogElement);

// Check if element is focusable
if (focus.isFocusable(element)) {
	element.focus();
}
```

## Keyboard Utilities

```ts
import { keyboard } from 'alus-ui/a11y';

element.addEventListener('keydown', (e) => {
	// Check for activation keys (Enter/Space)
	if (keyboard.isActivationKey(e)) {
		// Activate button
	}

	// Check for Escape
	if (keyboard.isEscape(e)) {
		// Close modal/menu
	}

	// Check for arrow keys
	if (keyboard.isArrow(e)) {
		const direction = keyboard.getArrowDirection(e);
		// Handle arrow navigation
	}

	// Prevent default Space key scrolling
	keyboard.preventActivation(e);
});
```

## ID Generation

```svelte
<script>
	import { generateId } from 'alus-ui/a11y';

	const labelId = generateId('label');
	const errorId = generateId('error');
	const descriptionId = generateId('desc');
</script>

<Input
	{...labelAttrs({
		labelledby: labelId,
		describedby: descriptionId
	})}
	{...validationAttrs({ errormessage: errorId })}
/>
<label id={labelId}>Email</label>
<p id={descriptionId}>Enter your email address</p>
<p id={errorId} role="alert">Invalid email format</p>
```

## Examples

### Accessible Form Field

```svelte
<script>
	import { Input, labelAttrs, validationAttrs, generateId } from 'alus-ui';

	let value = $state('');
	let error = $state('');

	const labelId = generateId('label');
	const errorId = generateId('error');
	const helpId = generateId('help');
</script>

<div class="form-field">
	<label id={labelId} for="email">Email Address</label>

	<Input
		id="email"
		bind:value
		placeholder="you@example.com"
		{...labelAttrs({
			labelledby: labelId,
			describedby: `${helpId} ${errorId}`
		})}
		{...validationAttrs({
			invalid: !!error,
			required: true,
			errormessage: errorId
		})}
		required
		autocomplete="email"
		inputmode="email"
	/>

	<p id={helpId} class="help-text">We'll never share your email with anyone else.</p>

	{#if error}
		<p id={errorId} class="error" role="alert" aria-live="polite">
			{error}
		</p>
	{/if}
</div>
```

### Accessible Toggle Button

```svelte
<script>
	import { Button, interactiveStateAttrs } from 'alus-ui';

	let isPressed = $state(false);
</script>

<Button
	onclick={() => (isPressed = !isPressed)}
	aria-label="Toggle mute"
	{...interactiveStateAttrs({ pressed: isPressed })}
>
	{#if isPressed}
		Muted
	{:else}
		Unmuted
	{/if}
</Button>
```

### Accessible Dropdown Menu

```svelte
<script>
	import {
		Button,
		widgetAttrs,
		labelAttrs,
		interactiveStateAttrs,
		mergeAttrs,
		generateId
	} from 'alus-ui';

	let isOpen = $state(false);
	const menuId = generateId('menu');
</script>

<div class="dropdown">
	<Button
		{...mergeAttrs(
			labelAttrs({ label: 'Options menu' }),
			interactiveStateAttrs({ expanded: isOpen }),
			widgetAttrs({
				haspopup: 'menu',
				controls: menuId
			})
		)}
		onclick={() => (isOpen = !isOpen)}
	>
		Options
	</Button>

	{#if isOpen}
		<ul id={menuId} role="menu">
			<li role="menuitem">Option 1</li>
			<li role="menuitem">Option 2</li>
			<li role="menuitem">Option 3</li>
		</ul>
	{/if}
</div>
```

## Benefits

(^_^) **DRY**: Don't repeat ARIA logic across components
(^_^) **Type-safe**: Full TypeScript support with proper types
(^_^) **Composable**: Mix and match utilities for complex patterns
(^_^) **Tested**: Follows WCAG 2.1 AA standards
(^\_^) **Maintainable**: Centralized accessibility logic
