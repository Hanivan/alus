# Alus - Svelte 5 Component Library

> **Unstyled, accessible Svelte 5 components** with full keyboard navigation and WCAG 2.1 AA compliance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.55-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)

## 🎯 What is Alus?

Alus is a monorepo containing:
- **📦 Component Library** (`packages/alus`) - Unstyled, accessible UI components
- **🎨 Showcase App** (`/`) - Live demo and documentation site

### Features

- ♿ **Accessible** - WCAG 2.1 AA compliant out of the box
- ⌨️ **Keyboard-Friendly** - Full keyboard navigation support
- 🎨 **Unstyled** - Complete styling freedom with Tailwind CSS
- 🔷 **Svelte 5 Native** - Built with runes mode (`$props`, `$derived`, `$state`)
- 📝 **Type-Safe** - Full TypeScript support
- 🌳 **Tree-Shakeable** - Import only what you need

## 🚀 Quick Start

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

## 📁 Project Structure

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

## 🛠️ Development

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
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests (Playwright)

# Code Quality
pnpm check            # Type checking with svelte-check
pnpm lint             # Lint with Prettier + ESLint
pnpm format           # Format code with Prettier
```

## 📦 Available Components

### ✅ Currently Available

- **Button** - Accessible button with ARIA support and toggle states
- **Input** - Text input with validation, error states, and accessibility

### 🚧 Planned Components

See [Component Roadmap](docs/todos/ui-components-roadmap.md) for the full list:

**Sprint 0** - Instant Wins
- VisuallyHidden, FocusTrap, Portal
- Badge, Tag, Divider
- Avatar

**Sprint 1** - Form Foundation
- Checkbox, Radio, RadioGroup
- Select, Textarea
- Label, Fieldset, Form

**Sprint 2** - Form Extensions + Feedback
- Switch, Slider, FileInput, SearchInput
- Alert, Progress, Spinner, Skeleton

And more! Check the roadmap for details.

## 🎨 Styling with Tailwind CSS

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

## ♿ Accessibility Features

Every Alus component includes:

- ✅ Semantic HTML elements
- ✅ ARIA attributes and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Error and validation states
- ✅ Visible focus indicators

WCAG 2.1 AA compliant out of the box.

## 📚 Documentation

- [Component Library README](packages/alus/README.md) - Detailed component API
- [Component Roadmap](docs/todos/ui-components-roadmap.md) - See what's coming next
- [Showcase App](http://localhost:5173) - Live demo of all components

## 🤝 Contributing

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

## 🧪 Testing

```bash
# Unit tests (Vitest)
pnpm test:unit

# E2E tests (Playwright)
pnpm test:e2e

# Type checking
pnpm check

# Linting
pnpm lint
```

## 📦 Publishing

The `alus` package is published to npm from `packages/alus/`.

```bash
cd packages/alus
pnpm build
pnpm test
npm publish
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT

## 🙏 Acknowledgments

Built with:
- [Svelte 5](https://svelte.dev/) - Cybernetically enhanced web apps
- [SvelteKit](https://kit.svelte.dev/) - Web framework for Svelte
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Floating UI](https://floating-ui.com/) - Positioning engine for overlays
- [Runed](https://runed.dev/) - Svelte 5 utilities library
- [Phosphor Icons](https://phosphoricons.com/) - Icon library

## 🔗 Links

- [GitHub Repository](https://github.com/Hanivan/alus)
- [npm Package](https://www.npmjs.com/package/alus)
- [Component Library](./packages/alus/README.md)
- [Component Roadmap](./docs/todos/ui-components-roadmap.md)
- [Issue Tracker](https://github.com/Hanivan/alus/issues)

---

**Note**: This library is in active development. APIs may change before v1.0 release.

⭐ If you like this project, please consider giving it a star on GitHub!
