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

#### Current Components ✅
- **Button** - Basic button with full ARIA support, toggle states
- **Input** - Text input with validation, error states, and accessibility

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
- **Add-ons**: prettier, eslint, vitest, playwright, tailwindcss, sveltekit-adapter, mcp
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
# Unit tests (Vitest)
pnpm test:unit        # Run unit tests only

# All tests
pnpm test             # Run unit + E2E tests

# E2E tests (Playwright)
pnpm test:e2e         # Run Playwright end-to-end tests
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
  - `button/Button.svelte` - Unstyled accessible button component
  - `input/Input.svelte` - Unstyled accessible input component
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

When adding new components to the Alus library:

1. **Location**: Create in `packages/alus/src/lib/components/{category}/{ComponentName}.svelte`
2. **Export**: Add to `packages/alus/src/lib/components/index.ts`
3. **Accessibility**: Must include proper ARIA attributes (use utils in `src/lib/utils/a11y/`)
4. **Unstyled**: No default styling - only structure and behavior
5. **TypeScript**: Full type safety with proper prop definitions
6. **Runes Mode**: Use Svelte 5 runes (`$props`, `$derived`, `$state`)
7. **Documentation**: Add usage examples in showcase app
8. **Testing**: Add unit tests in `src/lib/vitest-examples/` pattern

### Component Template
```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { generateId } from '$utils/a11y';

	interface Props {
		// Add props here
	}
	let { 
		// destructure props
	}: Props = $props();

	// Use $derived, $state, etc. as needed
</script>

<!-- Unstyled, semantic HTML with proper ARIA -->
<div></div>
```

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
- `playwright` ^1.59.1 - E2E testing framework
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
