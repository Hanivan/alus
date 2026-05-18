# alus-ui

> **Unstyled, accessible Svelte 5 components** with full keyboard navigation and WCAG 2.1 AA compliance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.55-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
[![npm package](https://img.shields.io/badge/npm-alus--ui-critical)](https://www.npmjs.com/package/alus-ui)

alus-ui provides a set of primitive UI components that are:

- **Unstyled** - Complete styling freedom with Tailwind CSS or any CSS framework
- **Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- **Keyboard-friendly** - Full keyboard navigation support
- **Type-safe** - Built with TypeScript
- **Svelte 5 Native** - Uses runes mode (`$props`, `$derived`, `$state`)

## Installation

```bash
npm install alus-ui
# or
pnpm add alus-ui
# or
yarn add alus-ui
```

## Quick Start

```svelte
<script lang="ts">
	import { Button, Input } from 'alus-ui';

	let name = $state('');
</script>

<Input bind:value={name} placeholder="Enter your name" aria-label="Name input" />

<Button onclick={() => alert(`Hello ${name}!`)}>Submit</Button>
```

## Available Components

### Form Components (^\_^)b

- **Button** - Accessible button with ARIA support and toggle states
- **Input** - Text input with validation, error states, and accessibility

## Features

### (°_°) Accessibility First

- WCAG 2.1 AA compliant out of the box
- Proper ARIA attributes (aria-label, aria-describedby, aria-invalid, etc.)
- Screen reader support with semantic HTML
- Keyboard navigation with visible focus indicators
- Live regions for dynamic content announcements

### (☆^\_☆) Complete Styling Control

- No default styles or colors
- Works seamlessly with Tailwind CSS
- Easy to theme with CSS variables
- Responsive and mobile-friendly

### (☆^O^☆) Svelte 5 Runes Mode

- Modern reactive syntax with `$props`, `$derived`, `$state`
- Better TypeScript support
- Improved performance
- Future-proof Svelte architecture

### (^\_^) Type Safety

- Full TypeScript support
- Type-safe props and events
- IntelliSense in IDEs

## Styling with Tailwind CSS

```svelte
<script lang="ts">
	import { Button } from 'alus-ui';
</script>

<Button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" aria-label="Submit form">
	Submit
</Button>
```

## Form Validation Example

```svelte
<script lang="ts">
	import { Input } from 'alus-ui';

	let email = $state('');
	let emailError = $derived.by(() => {
		if (email && !email.includes('@')) {
			return 'Please enter a valid email';
		}
		return '';
	});
</script>

<label for="email">Email</label>
<Input
	id="email"
	name="email"
	type="email"
	bind:value={email}
	aria-invalid={!!emailError}
	aria-describedby={emailError ? 'email-error' : undefined}
	class={emailError ? 'border-red-500' : 'border-gray-300'}
/>
{#if emailError}
	<p id="email-error" class="text-red-500" role="alert">
		{emailError}
	</p>
{/if}
```

## Component API

### Button

```svelte
<Button type="button" disabled={false} aria-pressed={undefined} class="" onclick={() => {}}>
	Button content
</Button>
```

**Props:**

- `type?: 'button' | 'submit' | 'reset'` - Button type (default: 'button')
- `disabled?: boolean` - Disabled state
- `aria-pressed?: boolean` - Toggle button state
- `class?: string` - CSS classes for styling
- All standard HTML button attributes

### Input

```svelte
<Input
	type="text"
	value={''}
	autocomplete="off"
	inputmode="text"
	aria-invalid={false}
	aria-label={undefined}
	aria-describedby={undefined}
	class=""
	oninput={(e) => {}}
/>
```

**Props:**

- `type?: HTMLInputTypeAttribute` - Input type (default: 'text')
- `value?: string` - Input value (use `bind:value` for two-way binding)
- `autocomplete?: string` - Autocomplete attribute
- `inputmode?: string` - Input mode for mobile keyboards
- `aria-invalid?: boolean` - Invalid state for validation
- `aria-label?: string` - Accessibility label
- `aria-describedby?: string` - ID of describing element
- `class?: string` - CSS classes for styling
- All standard HTML input attributes

## Accessibility Features

Each component includes:

- (^\_^) Semantic HTML elements
- (^\_^) ARIA attributes and roles
- (^\_^) Keyboard navigation support
- (^\_^) Focus management
- (^\_^) Screen reader announcements
- (^\_^) Error and validation states
- (^\_^) Visible focus indicators

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please see our [contributing guidelines](../../CONTRIBUTING.md) for details.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run type checking
pnpm check

# Build library
pnpm build

# Run tests (Vitest)
pnpm test
```

## Releasing

Releases are driven by [release-it](https://github.com/release-it/release-it) + `@release-it/conventional-changelog`. Versions auto-bump from [Conventional Commits](https://www.conventionalcommits.org/) (`feat:` → minor, `fix:` → patch, `feat!:` / `BREAKING CHANGE:` → major).

### Prerequisites

- Logged in to npm: `npm whoami` should print your username
- `GITHUB_TOKEN` env var set (else release-it falls back to the web UI for the GitHub release)
- Clean working tree on `main`

### Commands

```bash
cd packages/alus

pnpm release:dry      # preview — no git/npm/github writes
pnpm release          # interactive — prompts for the bump
pnpm release:patch    # 0.1.0 → 0.1.1
pnpm release:minor    # 0.1.0 → 0.2.0
pnpm release:major    # 0.1.0 → 1.0.0
```

### What `pnpm release` does

1. `before:init` hook → `pnpm check` (svelte-check must pass)
2. Bumps `package.json` version
3. `after:bump` hook → `pnpm build` (regenerates `dist/`)
4. Writes `CHANGELOG.md` from conventional commits since the last tag
5. Commits `chore(release): v<version>` and tags `v<version>`
6. Pushes commit + tag to `origin/main`
7. Creates GitHub release with the changelog body
8. Publishes to npm (`npm publish` runs `prepublishOnly` → build + test again)

### Commit message conventions

| Prefix       | Section in CHANGELOG | Bump  |
| ------------ | -------------------- | ----- |
| `feat:`      | Features             | minor |
| `fix:`       | Bug Fixes            | patch |
| `perf:`      | Performance          | patch |
| `refactor:`  | Refactors            | patch |
| `docs:`      | Documentation        | patch |
| `test:`      | Tests                | patch |
| `build:`     | Build                | patch |
| `ci:` / `chore:` / `style:` | _(hidden)_ | none |

Append `!` after the type (or include `BREAKING CHANGE:` in the body) for a major bump.

### Config

Settings live in `packages/alus/.release-it.json`. Tag scheme is `v<version>`.

## License

MIT

## Repository

- **GitHub**: https://github.com/Hanivan/alus
- **Issues**: https://github.com/Hanivan/alus/issues
- **Documentation**: https://github.com/Hanivan/alus#readme

## Acknowledgments

Built with:

- [Svelte 5](https://svelte.dev/) - Cybernetically enhanced web apps
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Floating UI](https://floating-ui.com/) - Positioning engine for overlays
- [Runed](https://runed.dev/) - Svelte 5 utilities library

## Related Projects

- [Showcase App](https://github.com/Hanivan/alus) - Live demo of all alus-ui components
- [Contributing](https://github.com/Hanivan/alus/blob/main/CONTRIBUTING.md) - How to contribute

---

**Note**: This library is in active development. APIs may change before v1.0 release.
