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

#### Component Status (^\_^)b

The roadmap in `docs/todos/ui-components-roadmap.md` is **complete** — every checked item has a source file, export, and demo route. The canonical list of shipped components lives in `packages/alus/src/lib/components/index.ts`. Categories covered:

- **Form**: Button, Input, Checkbox, Radio, RadioGroup, Select, Textarea, Switch, Slider, FileInput, SearchInput, NumberInput, Form, Fieldset, Label, FieldError, InputGroup, Rating, IconButton, ToggleButton, AutoComplete, Calendar, DatePicker, DateRange, DateRangePicker, TimePicker, ColorPicker
- **Navigation**: Tabs, Accordion, Breadcrumb, Pagination, Link, ExternalLink, Navigation, Menu, SubMenu, Stepper, CommandMenu
- **Feedback**: Badge, Tag, Spinner, Skeleton, Progress, Alert, Callout, Banner, InlineMessage, LiveRegion, NotificationBell, Toast (+ Toaster)
- **Display**: Divider, Kbd, AspectRatio, Frame, Timestamp, CodeBlock, StatCard, Avatar, Card, Image, List, DataList, Table, TreeView, Timeline, Compare, Carousel
- **Overlay**: Modal, Dialog, Drawer, Sheet, Tooltip, Popover, Dropdown, Overlay, Lightbox, ContextMenu
- **Layout**: Stack, Flex, Grid, Container, Spacer, Columns
- **Interactive**: Sortable, Swipeable, Resizable, SplitView, Draggable, Droppable, InfiniteScroll, VirtualList
- **Utility**: VisuallyHidden, Portal, FocusTrap, ScreenReaderOnly, Conditional

**Explicit N/A** (per roadmap): `Clone` (Svelte 5 lacks `cloneElement`), `RichTextEditor`/`DataGrid`/`Chart`/`VideoPlayer`/`AudioPlayer`/`MapView` (use external libs).

Date components use **`@internationalized/date`** for locale/timezone/non-Gregorian-calendar correctness.

---

## Project Configuration

- **Language**: TypeScript
- **Package Manager**: pnpm (workspace monorepo)
- **Framework**: SvelteKit (root), Svelte Package (alus library)
- **Add-ons**: prettier, eslint, vitest, tailwindcss, sveltekit-adapter, mcp
- **Deployment**: Netlify adapter
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite, `@tailwindcss/forms` + `@tailwindcss/typography` plugins

---

## Showcase Aesthetic

The showcase app (`src/routes/`) uses a **Japanese Creative / 和モダン** web style — disciplined negative space, traditional craft motifs, and a restrained palette. The library itself stays unstyled; this aesthetic only lives in the showcase.

### Palette (CSS custom properties in `src/routes/layout.css`)

| Token | Hex | Use |
| --- | --- | --- |
| `--indigo-dye` | `#1e3a5f` | Primary borders, accents, selected state |
| `--vermilion` | `#e85d4e` | Hanko seal, hover accents, danger |
| `--matcha` | `#7a9b56` | Success state |
| `--cherry-blossom` | `#f8c3cd` | Soft accent |
| `--cream` | `#faf8f5` | Background tint *(reserved — avoid on white text)* |
| `--charcoal` | `#2d2d2d` | Body text |
| `--ink` | `#1a1a1a` | Headings |
| `--paper-white` | `#fcfbf9` | Page background |
| `--bamboo` | `#8b7355` | Subtitles, supporting text |
| `--muted-gold` | `#c9a959` | Highlights |

### Typography

- **Display**: `Cormorant Garamond` via `.font-display` — headings, hanko, kanji decorations
- **Body**: `Zen Kaku Gothic New` — paragraphs, UI text

### Recurring building blocks

- `.japanese-border` — 2px indigo-dye border with vermilion corner squares (top-left, bottom-right)
- `.hanko-seal` — round vermilion seal, slight `rotate(-5deg)`, holds a kanji
- `.seigaiha-pattern` — traditional wave pattern as background
- `.vertical-text` — `writing-mode: vertical-rl` for kanji column headings
- `.paper-texture::before` — SVG noise overlay for paper feel
- `.animate-fade-in-up` (+ `animation-delay-{100..400}`) — staggered entry

### Demo page template

Every component demo at `src/routes/components/{component}/+page.svelte` follows this skeleton — keep it consistent when adding new demos:

```svelte
<a href="/" class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) hover:text-(--vermilion)">
    <CaretLeft class="h-5 w-5" />
    <span>Back to Components</span>
</a>
<main>
    <header class="mb-16">
        <div class="hanko-seal">{kanji}</div>          <!-- 1-char kanji -->
        <h1 class="font-display text-5xl text-(--ink) md:text-6xl">ComponentName</h1>
        <p class="tracking-widest text-(--bamboo)">{japanese-subtitle}</p>
    </header>
    <section class="mb-16">
        <h2 class="font-display mb-6 text-2xl text-(--ink)">Section title</h2>
        <div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
            <!-- live example -->
        </div>
    </section>
</main>
```

### Input styling convention

Text-like inputs use **2px indigo-dye border** that intensifies on focus:

```
border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none
```

The global `*:focus-visible` outline is suppressed for form controls (in `@layer base`) so border-color is the single focus indicator — never stack outline + border. `[type='text'|email|...]` chrome strips are inside `@layer base` so utility classes override them without `!important`.

### Conventions

- Always run the showcase through the components page (`src/routes/+page.svelte`) — every new component gets a card entry there.
- **Do not use `--cream` as a background for elements containing white text** — readability issue (past incident with SubMenu open state). Prefer `--charcoal/10` or `--indigo-dye/10`.
- Avoid emojis in demo text; the kanji + hanko fill that visual role.
- Use `phosphor-svelte` for all icons — consistent stroke weight matches the aesthetic.

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

- `src/lib/components/` - Core component library, organised by category: `form/`, `navigation/`, `feedback/`, `display/`, `overlay/`, `layout/`, `interactive/`, `utility/`. Each component lives in its own folder `{category}/{component-lowercase}/{ComponentName.svelte, index.ts}`. The full export list is in `src/lib/components/index.ts`.
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
- `@internationalized/date` - Locale/timezone-aware date math (Calendar, DatePicker, DateRange, DateRangePicker)

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
