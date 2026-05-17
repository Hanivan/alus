## Project Overview

**Alus** is a monorepo containing an unstyled, accessible component library built with Svelte 5 runes mode.

### Repository Structure

This is a **pnpm workspace** with two main packages:

- **Root** (`/`) - SvelteKit showcase/demo application demonstrating the Alus components
- **packages/alus** - The core component library (publishable package)

### Component Library Philosophy

The Alus library provides **unstyled, accessible UI primitives** that:

- Have no default styling (complete styling freedom with Tailwind CSS)
- Include proper ARIA attributes and semantic HTML
- Use Svelte 5 runes mode exclusively
- Are fully type-safe with TypeScript
- Follow WCAG 2.1 AA accessibility standards
- Are keyboard navigable with visible focus indicators

#### Current Components (^\_^)b

- **Button** - Basic button with full ARIA support, toggle states
- **Input** - Text input with validation, error states, and accessibility
- **Checkbox** - Checkbox with indeterminate state and ARIA support
- **Radio** - Radio button with keyboard navigation and accessibility
- **Badge** - Status indicator with ARIA live regions and variant support

#### Planned Components 🚧

See `docs/todos/ui-components-roadmap.md` for the complete roadmap including:

- Form: Checkbox, Radio, Select, Textarea, Switch, Slider, etc.
- Feedback: Alert, Toast, Progress, Badge, Tag, etc.
- Navigation: Tabs, Accordion, Breadcrumb, Menu, etc.
- Overlay: Modal, Dialog, Tooltip, Popover, etc.
- Display: Card, Avatar, List, Table, etc.

---

## Project Configuration

- **Language**: TypeScript
- **Package Manager**: pnpm (workspace monorepo)
- **Framework**: SvelteKit (root), Svelte Package (alus library)
- **Add-ons**: prettier, eslint, vitest, tailwindcss, sveltekit-adapter, mcp
- **Deployment**: Netlify adapter
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

---

## Development Workflow

### Starting Development

The root project uses `concurrently` to run both the showcase app and library package in watch mode:

```bash
pnpm dev              # Start both showcase app (port 5173) and library watcher
pnpm dev:showcase     # Only start the showcase app
```

For library development:

```bash
cd packages/alus
pnpm dev              # Watch mode for library package
```

### Building

```bash
# Root application
pnpm build            # Build showcase app for production
pnpm preview          # Preview production build

# Library package
cd packages/alus
pnpm build            # Build library for publishing
pnpm prepack          # Create distributable package
```

### Testing

```bash
# Run tests (Vitest)
pnpm test             # Run all tests
```

### Code Quality

```bash
# Linting
pnpm lint             # Check code with Prettier + ESLint
pnpm format           # Format code with Prettier

# Type checking
pnpm check            # Run svelte-check for type errors
pnpm check:watch      # Watch mode for type checking
```

---

## Key Files & Their Purposes

### Root Application (`/`)

- `vite.config.ts` - Vite config with Tailwind CSS Vite plugin, Vitest config for client/server tests
- `svelte.config.js` - SvelteKit config with Netlify adapter, path aliases ($components, $utils, $types)
- `src/routes/+page.svelte` - Main showcase page demonstrating all components
- `src/routes/demo/` - Demo pages for specific components
- `src/lib/components/` - Showcase-specific components (Navbar, Footer)

### Library Package (`packages/alus/`)

- `src/lib/components/` - Core component library
  - `form/button/Button.svelte` - Unstyled accessible button component
  - `form/input/Input.svelte` - Unstyled accessible input component
  - `form/checkbox/Checkbox.svelte` - Unstyled accessible checkbox component
  - `form/radio/Radio.svelte` - Unstyled accessible radio component
  - `feedback/badge/Badge.svelte` - Unstyled accessible badge component
  - `feedback/tag/Tag.svelte` - Unstyled accessible tag component
  - `display/divider/Divider.svelte` - Unstyled accessible divider component
  - `feedback/tag/Tag.svelte` - Unstyled accessible tag component
  - `display/divider/Divider.svelte` - Unstyled accessible divider component
- `src/lib/utils/a11y/` - Accessibility utilities
  - `aria.ts` - ARIA attribute utilities
  - `focus.ts` - Focus management utilities
  - `id.ts` - ID generation utilities
  - `keyboard.ts` - Keyboard event utilities
- `src/lib/types/` - TypeScript type definitions
- `svelte.config.js` - Package config (forces runes mode)
- `vite.config.ts` - Build configuration for library

### Path Aliases (configured in svelte.config.js)

```typescript
$components → src/lib/components
$utils → src/lib/utils
$types → src/lib/types
```

---

## Component Development Guidelines

### Directory Structure (MANDATORY)

Every component MUST follow this exact directory structure (use `.ts` for exports, NOT `.js`):

```
packages/alus/src/lib/components/{category}/{component-lowercase}/
├── ComponentName.svelte    # Component implementation
└── index.ts                # Export file (.ts, NOT .js)
```

Example (Button):

```
packages/alus/src/lib/components/form/button/
├── Button.svelte
└── index.ts
```

The `index.ts` file must use this exact format:

```ts
export { default as ComponentName } from './ComponentName.svelte';
```

### Component Creation Steps

1. **Directory**: `packages/alus/src/lib/components/{category}/{component-lowercase}/`
2. **Component**: `{component-lowercase}/ComponentName.svelte`
3. **Export (TypeScript)**: `{component-lowercase}/index.ts` — MUST use `.ts`, NOT `.js`
4. **Re-export**: Add to `packages/alus/src/lib/components/index.ts`
5. **Accessibility (REQUIRED)**: Must use ARIA helper utilities - see below
6. **Unstyled**: No default styling
7. **TypeScript**: Full type safety
8. **Runes Mode**: Svelte 5 only (`$props`, `$derived`, `$state`)
9. **Documentation**: Add demo in `src/routes/components/{component}/+page.svelte`

### Component Template

```svelte
<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { AriaLive } from '$types/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		// Accessibility attributes
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby
	}: Props = $props();

	// Build ARIA attributes using reusable utilities
	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<!-- Unstyled, semantic HTML with proper ARIA -->
<span {...ariaAttrs}>
	{#if children}
		{@render children()}
	{/if}
</span>
```

---

## Accessibility Requirements

**Every component MUST use the ARIA helper utilities** - no manual ARIA attribute construction.

### ARIA Helper Utilities (`src/lib/utils/a11y/aria.ts`)

| Utility                   | Purpose                        | Example                                                           |
| ------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| `labelAttrs()`            | Label/description associations | `labelAttrs({ label, labelledby, describedby })`                  |
| `validationAttrs()`       | Form validation states         | `validationAttrs({ invalid, required, errormessage })`            |
| `interactiveStateAttrs()` | Interactive element states     | `interactiveStateAttrs({ disabled, pressed, expanded, checked })` |
| `widgetAttrs()`           | Complex widget attributes      | `widgetAttrs({ controls, haspopup, live, orientation })`          |
| `mergeAttrs()`            | Combine multiple ARIA objects  | `mergeAttrs(labelAttrs(...), interactiveStateAttrs(...))`         |

### Pattern for All Components

```svelte
<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled, pressed }),
			widgetAttrs({ controls, haspopup, live })
		)
	);
</script>

<element {...ariaAttrs}>...</element>
```

### WCAG 2.1 AA Requirements

- **Semantic HTML**: Use native elements (`<button>`, `<input>`, `<span>`) with proper roles
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus Indicators**: Visible focus states for keyboard users
- **Screen Reader Support**: Proper `aria-label`, `aria-describedby`, `aria-live` usage
- **Color Contrast**: Ensure sufficient contrast when styled (consumer responsibility)
- **Error Identification**: Form validation must use `aria-invalid` and `aria-errormessage`

---

## Dependencies

### Production Dependencies

- `svelte` ^5.55.2 - Svelte 5 with runes mode
- `@sveltejs/kit` ^2.57.0 - SvelteKit framework
- `phosphor-svelte` ^3.1.0 - Icon library
- `@floating-ui/dom` ^1.7.6 - Positioning engine (for overlays)
- `runed` ^0.37.1 - Svelte 5 utilities library

### Development Dependencies

- `tailwindcss` ^4.2.2 - Utility-first CSS framework
- `@tailwindcss/vite` ^4.2.2 - Tailwind Vite plugin
- `vitest` ^4.1.3 - Unit testing framework
- `@vitest/browser-playwright` ^4.1.3 - Browser testing for Vitest
- `vitest-browser-svelte` ^2.1.0 - Svelte utilities for Vitest browser testing
- `typescript` ^6.0.2 - TypeScript compiler
- `eslint` + `prettier` - Code quality tools
- `@sveltejs/adapter-netlify` ^6.0.4 - Netlify deployment adapter

---

## Important Notes

- **Svelte 5 Only**: This project uses Svelte 5 runes mode exclusively - no legacy mode support
- **Runes Mode**: All components use `$props`, `$derived`, `$state` runes instead of the old API
- **Unstyled Components**: The library provides structure and accessibility only - styling is left to the application
- **Monorepo**: Changes to library components require `pnpm dev` in library package for hot reload
- **Type Safety**: Always maintain proper TypeScript types for all components and props
- **Accessibility First**: Every component must be WCAG 2.1 AA compliant with proper keyboard navigation

---
