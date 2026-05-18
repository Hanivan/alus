# Contributing to alus-ui

Thank you for your interest in contributing to alus-ui! This document provides guidelines and instructions for contributing to the project.

## \(^o^)/ Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8
- Git

### Setup Development Environment

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/Hanivan/alus.git
   cd alus-svelte
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development servers**
   ```bash
   pnpm dev
   ```
   This starts both the library watcher and showcase application.

## (・\_・) Development Workflow

### 1. Choose What to Work On

- Check [Component Roadmap](docs/todos/ui-components-roadmap.md) for planned components
- Look at [GitHub Issues](https://github.com/Hanivan/alus/issues) for specific tasks
- Start with good first issues if you're new

### 2. Create a Branch

```bash
git checkout -b feature/your-component-name
# or
git checkout -b fix/issue-description
```

### 3. Implement Your Changes

#### Adding a New Component

1. **Create component structure** in `packages/alus/src/lib/components/`

   ```
   components/
   └── form/          # or feedback/, navigation/, etc.
       └── yourcomponent/
           ├── YourComponent.svelte
           └── index.ts
   ```

2. **Follow component template** — components MUST use the shared ARIA helpers, never construct ARIA attributes by hand:

   ```svelte
   <script lang="ts">
   	import {
   		labelAttrs,
   		interactiveStateAttrs,
   		widgetAttrs,
   		mergeAttrs
   	} from '$utils/a11y/index.js';

   	interface Props {
   		children?: import('svelte').Snippet;
   		class?: string;
   		disabled?: boolean;
   		'aria-label'?: string;
   		'aria-labelledby'?: string;
   		'aria-describedby'?: string;
   	}

   	let {
   		children,
   		class: className = '',
   		disabled = false,
   		'aria-label': ariaLabel,
   		'aria-labelledby': ariaLabelledby,
   		'aria-describedby': ariaDescribedby
   	}: Props = $props();

   	const ariaAttrs = $derived(
   		mergeAttrs(
   			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
   			interactiveStateAttrs({ disabled })
   		)
   	);
   </script>

   <button type="button" class={className} {disabled} {...ariaAttrs}>
   	{#if children}{@render children()}{/if}
   </button>
   ```

3. **Export from index files**
   - Create `packages/alus/src/lib/components/{category}/{component}/index.ts` (**must** be `.ts`, not `.js`):
     ```ts
     export { default as YourComponent } from './YourComponent.svelte';
     ```
   - Re-export from `packages/alus/src/lib/components/index.ts`

4. **Add a demo** at `src/routes/components/{component}/+page.svelte` following the Japanese-aesthetic template documented in `CLAUDE.md` (hanko-seal + kanji + `japanese-border`).

#### Component Requirements

All components must be:

- (^\_^) **Unstyled** - No default colors, spacing, or styling assumptions
- (^\_^) **Accessible** - WCAG 2.1 AA compliant with proper ARIA
- (^\_^) **Type-safe** - Full TypeScript support
- (^\_^) **Keyboard-friendly** - Complete keyboard navigation
- (^\_^) **Screen reader support** - Proper labels and announcements
- (^\_^) **Svelte 5 runes** - Use `$props`, `$derived`, `$state`

### 4. Test Your Changes

```bash
# Type checking
pnpm check

# Run tests (Vitest)
pnpm test

# Linting
pnpm lint

# Format code
pnpm format
```

### 5. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/) — release-it parses these to bump the version and write the changelog.

```bash
git commit -m "feat: add Checkbox component"          # → minor bump, "Features" section
git commit -m "fix: correct aria-label on Button"     # → patch bump, "Bug Fixes" section
git commit -m "refactor: simplify menu focus logic"   # → patch bump, "Refactors" section
git commit -m "docs: update README with new examples" # → patch bump, "Documentation" section
git commit -m "feat!: rename Switch prop 'on' → 'checked'  # → major bump (breaking)
```

`chore:` / `ci:` / `style:` are hidden from the changelog and don't trigger a bump.

### 6. Create Pull Request

1. Push your branch to GitHub
2. Create a pull request with:
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes
   - Usage examples

## (・\_・) Coding Standards

### TypeScript

- Use strict type checking
- Define interfaces for component props
- Export types for public APIs
- Use proper type imports

```typescript
// Good
import type { HTMLAttributes } from 'svelte/elements';
interface Props {
	disabled?: boolean;
	class?: string;
}

// Bad
let disabled: boolean | undefined = $props();
```

### Svelte 5 Runes

Always use Svelte 5 runes syntax. No legacy mode anywhere in the codebase.

```svelte
<script lang="ts">
	// Good — runes
	let { count = 0 }: Props = $props();
	let doubled = $derived(count * 2);
	let message = $state('hello');

	// Bad — legacy
	export let count = 0;
	$: doubled = count * 2;
</script>
```

### Effects and listeners

- **No `onMount` / `onDestroy`.** Use `$effect(() => { ...; return cleanup; })`.
- **No raw `addEventListener` / `removeEventListener` on `document` or `window`.** Use `useEventListener` from `runed` with a gated getter so attach/detach is reactive:

  ```ts
  import { useEventListener } from 'runed';

  useEventListener(
  	() => (open ? document : null),
  	'keydown',
  	(e) => {
  		if (e.key === 'Escape') close();
  	}
  );
  ```

Listeners on a local node inside an `Attachment` are fine to keep inline.

### Accessibility

Every component must include:

1. **Semantic HTML** — Use proper elements
2. **ARIA via the shared helpers** — never inline `aria-*` strings; route everything through `labelAttrs` / `validationAttrs` / `interactiveStateAttrs` / `widgetAttrs` / `mergeAttrs` from `$utils/a11y`
3. **ARIA value types** from `$types/index.ts` — derived from `svelte/elements` (`AriaBoolean`, `AriaTristate`, `AriaHaspopup`, `AriaLive`, `AriaCurrent`, `AriaRelevant`, `AriaOrientation`). Never redeclare literal unions.
4. **Keyboard support** — Enter, Space, Escape, Arrow keys, Home/End, Tab
5. **Focus management** — `trap` + `focusFirst` for modals, roving tabindex for composite widgets, visible focus indicators
6. **Screen reader support** — labels, live regions via `<VisuallyHidden role="status" aria-live="polite">` (never inline `style="position:absolute…"` or Tailwind `sr-only`)
7. **Form validation** — `aria-invalid` + `aria-errormessage` via `validationAttrs`
8. **Virtualised / paginated content** — emit `aria-setsize` + `aria-posinset` (see VirtualList, StepperStep)

```svelte
<script lang="ts">
	import {
		labelAttrs,
		validationAttrs,
		interactiveStateAttrs,
		widgetAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			validationAttrs({ invalid, required, errormessage }),
			interactiveStateAttrs({ disabled, pressed }),
			widgetAttrs({ controls, haspopup, orientation })
		)
	);
</script>

<button type="button" {...ariaAttrs}>{label}</button>
```

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Keep components focused and simple
- Write clear, self-documenting code
- Add comments for complex logic

## (・\_・) Testing

The project uses Vitest for unit testing with browser testing support via `@vitest/browser-playwright`.

### Unit Tests

Create tests alongside components:

```typescript
// YourComponent.svelte.spec.ts
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import YourComponent from './YourComponent.svelte';

describe('YourComponent', () => {
	it('renders correctly', () => {
		const { getByRole } = render(YourComponent);
		expect(getByRole('button')).toBeTruthy();
	});
});
```

### Browser Tests

Test keyboard navigation and screen reader support:

```typescript
import { page } from 'vitest/browser';

it('handles keyboard interaction', async () => {
	const { getByRole } = render(YourComponent);
	const button = getByRole('button');

	await page.element(button).click();
	// Assert behavior
});
```

## 📖 Documentation

### Component Documentation

Each component should have:

1. **Usage examples** in showcase app
2. **Props documentation** in component file or README
3. **Accessibility notes** if complex behavior
4. **TypeScript types** exported for users

```svelte
<!--
	Checkbox

	Accessible checkbox component with keyboard support.

	Props:
	- checked: boolean - Current checked state
	- disabled: boolean - Disable the checkbox
	- aria-label: string - Accessibility label

	Events:
	- change: Dispatched when value changes

	Usage:
	<Checkbox bind:checked={value} />
-->
```

## (☆^\_☆) Design Principles

### Unstyled Philosophy

- **No default colors** - Let users control appearance
- **No layout assumptions** - Don't force responsive behavior
- **Utility-friendly** - Works with Tailwind, CSS-in-JS, plain CSS
- **Theme-agnostic** - Support light/dark mode via CSS variables

### Accessibility First

- **Keyboard navigation** - All features accessible via keyboard
- **Screen readers** - Proper ARIA and semantic HTML
- **Focus indicators** - Visible focus states
- **Error handling** - Clear error messages and states
- **WCAG 2.1 AA** - Meet accessibility standards

## (x_x) Reporting Issues

When reporting bugs:

1. **Search existing issues** first
2. **Use issue templates** if available
3. **Provide reproduction** - Code snippet or reproduction link
4. **Describe expected vs actual** behavior
5. **Include environment info** - Browser, OS, Svelte version

## (º_º) Discussion

For questions and discussions:

- Start a [GitHub Discussion](https://github.com/Hanivan/alus/discussions)
- Join our community chat (if available)
- Check existing documentation first

## (ಠ_ಠ) Code of Conduct

Be respectful, inclusive, and constructive:

- Respect differing opinions
- Provide constructive feedback
- Accept feedback gracefully
- Focus on what's best for the community

## \(^\_^)/ Recognition

Contributors will be:

- Listed in contributors section
- Credited in release notes
- Acknowledged in significant contributions

Thank you for contributing to alus-ui! (♡˙︶˙♡)

## (>\_<) Releasing

Maintainers cut releases with [release-it](https://github.com/release-it/release-it). See `packages/alus/README.md#releasing` for the full pipeline. TL;DR:

```bash
cd packages/alus
pnpm release:dry      # preview
pnpm release          # interactive
```

Versions auto-bump from conventional commits. Tag format: `v<version>`.

## (・\_・) Additional Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Component Roadmap](docs/todos/ui-components-roadmap.md)
- [Project CLAUDE.md](CLAUDE.md) — full conventions reference
