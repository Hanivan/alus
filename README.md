# Alus - Svelte 5 Component Library

> **Unstyled, accessible Svelte 5 components** with full keyboard navigation and WCAG 2.1 AA compliance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.55-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)

## (☆^O^☆) What is Alus?

Alus is a monorepo containing:
- **(^_^) Component Library** (`packages/alus`) - Unstyled, accessible UI components
- **(^_^) Showcase App** (`/`) - Live demo and documentation site

### Features

- (°_°) **Accessible** - WCAG 2.1 AA compliant out of the box
- (・_・) **Keyboard-Friendly** - Full keyboard navigation support
- (☆^_☆) **Unstyled** - Complete styling freedom with Tailwind CSS
- (☆^O^☆) **Svelte 5 Native** - Built with runes mode (`$props`, `$derived`, `$state`)
- (^_^) **Type-Safe** - Full TypeScript support
- (^_^)b **Tree-Shakeable** - Import only what you need

## \(^o^)/ Quick Start

### Installation

```bash
# Install the component library
npm install alus
# or
pnpm add alus
```

### Usage

```svelte
<script lang="ts">
	import { Button, Input } from 'alus';

	let name = $state('');
</script>

<Input
	bind:value={name}
	placeholder="Enter your name"
	aria-label="Name input"
/>

<Button onclick={() => alert(`Hello ${name}!`)}>
	Submit
</Button>
```

## (>_>) Project Structure

```
alus-svelte/
├── packages/
│   └── alus/                    # Component library (publishable)
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/  # UI components
│       │   │   │   └── form/    # Form components
│       │   │   │       ├── button/
│       │   │   │       └── input/
│       │   │   ├── utils/      # Utility functions
│       │   │   │   └── a11y/    # Accessibility utilities
│       │   │   └── types/      # TypeScript types
│       │   └── index.ts
│       ├── package.json
│       └── README.md
├── src/                         # Showcase application
│   ├── routes/
│   │   └── +page.svelte         # Main demo page
│   └── lib/
│       └── components/          # Showcase-specific components
├── docs/
│   └── todos/
│       └── ui-components-roadmap.md  # Component roadmap
├── package.json                 # Root package.json
├── pnpm-workspace.yaml          # Monorepo configuration
└── README.md                    # This file
```

## (・_・) Development

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Setup

```bash
# Clone the repository
git clone https://github.com/Hanivan/alus.git
cd alus-svelte

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

This starts:
- **Library watcher** - Watches for changes in `packages/alus`
- **Showcase app** - Runs on `http://localhost:5173`

### Available Scripts

```bash
# Development
pnpm dev              # Start both library and showcase
pnpm dev:showcase     # Start only showcase app

cd packages/alus
pnpm dev              # Start library watcher only

# Building
pnpm build            # Build showcase app
cd packages/alus
pnpm build            # Build library for publishing

# Testing
pnpm test             # Run Vitest tests
pnpm test:unit        # Run unit tests (alias for test)

# Code Quality
pnpm check            # Type checking with svelte-check
pnpm lint             # Lint with Prettier + ESLint
pnpm format           # Format code with Prettier
```

## (^_^) Available Components

### (^_^)b Currently Available

- **Button** - Accessible button with ARIA support and toggle states
- **Input** - Text input with validation, error states, and accessibility

## (☆^_☆) Styling with Tailwind CSS

Alus components are unstyled and designed to work with Tailwind CSS:

```svelte
<script lang="ts">
	import { Button } from 'alus';
</script>

<!-- Primary button -->
<Button
	class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
	aria-label="Submit form"
>
	Submit
</Button>

<!-- Toggle button -->
<Button
	class="px-4 py-2 rounded {active
		? 'bg-green-600 text-white'
		: 'bg-gray-200 text-gray-700'}"
	aria-pressed={active}
	onclick={() => active = !active}
>
	{active ? 'Active' : 'Inactive'}
</Button>
```

## (°_°) Accessibility Features

Every Alus component includes:

- (^_^) Semantic HTML elements
- (^_^) ARIA attributes and roles
- (^_^) Keyboard navigation support
- (^_^) Focus management
- (^_^) Screen reader announcements
- (^_^) Error and validation states
- (^_^) Visible focus indicators

WCAG 2.1 AA compliant out of the box.

## (・_・) Documentation

- [Component Library README](packages/alus/README.md) - Detailed component API
- [Component Roadmap](docs/todos/ui-components-roadmap.md) - See what's coming next
- [Showcase App](http://localhost:5173) - Live demo of all components

## (^_^)b Contributing

Contributions are welcome! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Choose a component** from the [roadmap](docs/todos/ui-components-roadmap.md)
2. **Create a branch** for your component
3. **Implement** the component in `packages/alus/src/lib/components/`
4. **Add examples** to the showcase app in `src/routes/+page.svelte`
5. **Test** with `pnpm test`
6. **Submit** a pull request

### Component Guidelines

- Unstyled (no default colors/spacing)
- WCAG 2.1 AA compliant
- Full TypeScript support
- Svelte 5 runes mode
- Keyboard accessible
- Screen reader friendly

See [Component Development](CLAUDE.md) for detailed guidelines.

## (・_・) Testing

```bash
# Run tests (Vitest)
pnpm test

# Type checking
pnpm check

# Linting
pnpm lint
```

## (>_<) Publishing

The `alus` package is published to npm from `packages/alus/`.

```bash
cd packages/alus
pnpm build
pnpm test
npm publish
```

## (O_O) Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT

## (♡˙︶˙♡) Acknowledgments

Built with:
- [Svelte 5](https://svelte.dev/) - Cybernetically enhanced web apps
- [SvelteKit](https://kit.svelte.dev/) - Web framework for Svelte
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Floating UI](https://floating-ui.com/) - Positioning engine for overlays
- [Runed](https://runed.dev/) - Svelte 5 utilities library
- [Phosphor Icons](https://phosphoricons.com/) - Icon library

## (º_º) Links

- [GitHub Repository](https://github.com/Hanivan/alus)
- [npm Package](https://www.npmjs.com/package/alus)
- [Component Library](./packages/alus/README.md)
- [Component Roadmap](./docs/todos/ui-components-roadmap.md)
- [Issue Tracker](https://github.com/Hanivan/alus/issues)

---

**Note**: This library is in active development. APIs may change before v1.0 release.

(^_^)b If you like this project, please consider giving it a star on GitHub!
