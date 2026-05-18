# alus-ui - Svelte 5 Component Library

> **Unstyled, accessible Svelte 5 components** with full keyboard navigation and WCAG 2.1 AA compliance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.55-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)

## (☆^O^☆) What is alus-ui?

alus-ui is a monorepo containing:

- **(^\_^) Component Library** (`packages/alus`) - Unstyled, accessible UI components
- **(^\_^) Showcase App** (`/`) - Live demo and documentation site

### Features

- (°_°) **Accessible** - WCAG 2.1 AA compliant out of the box
- (・\_・) **Keyboard-Friendly** - Full keyboard navigation support
- (☆^\_☆) **Unstyled** - Complete styling freedom with Tailwind CSS
- (☆^O^☆) **Svelte 5 Native** - Built with runes mode (`$props`, `$derived`, `$state`)
- (^\_^) **Type-Safe** - Full TypeScript support
- (^\_^)b **Tree-Shakeable** - Import only what you need

## \(^o^)/ Quick Start

### Installation

```bash
# Install the component library
npm install alus-ui
# or
pnpm add alus-ui
```

### Usage

```svelte
<script lang="ts">
	import { Button, Input } from 'alus-ui';

	let name = $state('');
</script>

<Input bind:value={name} placeholder="Enter your name" aria-label="Name input" />

<Button onclick={() => alert(`Hello ${name}!`)}>Submit</Button>
```

## (>\_>) Project Structure

```
alus-svelte/
├── packages/
│   └── alus/                          # Component library, published as `alus-ui`
│       ├── src/lib/
│       │   ├── components/            # UI components, by category
│       │   │   ├── form/              # Button, Input, Checkbox, Radio, …
│       │   │   ├── navigation/        # Tabs, Menu, Stepper, Breadcrumb, …
│       │   │   ├── feedback/          # Toast, Alert, Spinner, Progress, …
│       │   │   ├── display/           # Card, Avatar, Table, Timeline, …
│       │   │   ├── overlay/           # Modal, Drawer, Popover, Tooltip, …
│       │   │   ├── layout/            # Stack, Flex, Grid, Container, …
│       │   │   ├── interactive/       # Sortable, VirtualList, SplitView, …
│       │   │   └── utility/           # VisuallyHidden, Portal, FocusTrap, …
│       │   ├── utils/a11y/            # ARIA helpers, focus mgmt, IDs
│       │   ├── utils/form/            # Form field helpers
│       │   └── types/                 # TypeScript types
│       ├── .release-it.json
│       ├── package.json
│       └── README.md
├── src/routes/                        # Showcase app (SvelteKit)
├── docs/todos/                        # Roadmap + a11y refactor plan
├── package.json                       # Root workspace
├── pnpm-workspace.yaml
└── CLAUDE.md                          # Project conventions
```

## (・\_・) Development

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

## (^\_^) Available Components

The canonical export list lives in `packages/alus/src/lib/components/index.ts`. Demos for every component are in `src/routes/components/{component}/+page.svelte`.

- **Form**: Button, Input, Checkbox, Radio, RadioGroup, Select, Textarea, Switch, Slider, FileInput, SearchInput, NumberInput, Form, Fieldset, Label, FieldError, InputGroup, Rating, IconButton, ToggleButton, AutoComplete, Calendar, DatePicker, DateRange, DateRangePicker, TimePicker, ColorPicker
- **Navigation**: Tabs, Accordion, Breadcrumb, Pagination, Link, ExternalLink, Navigation, Menu, SubMenu, Stepper, CommandMenu
- **Feedback**: Badge, Tag, Spinner, Skeleton, Progress, Alert, Callout, Banner, InlineMessage, LiveRegion, NotificationBell, Toast (+ Toaster)
- **Display**: Divider, Kbd, AspectRatio, Frame, Timestamp, CodeBlock, StatCard, Avatar, Card, Image, List, DataList, Table, TreeView, Timeline, Compare, Carousel
- **Overlay**: Modal, Dialog, Drawer, Sheet, Tooltip, Popover, Dropdown, Overlay, Lightbox, ContextMenu
- **Layout**: Stack, Flex, Grid, Container, Spacer, Columns
- **Interactive**: Sortable, Swipeable, Resizable, SplitView, Draggable, Droppable, InfiniteScroll, VirtualList
- **Utility**: VisuallyHidden, Portal, FocusTrap, ScreenReaderOnly, Conditional

Date components use [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/) for locale, timezone, and non-Gregorian-calendar correctness.

## (☆^\_☆) Styling with Tailwind CSS

alus-ui components are unstyled and designed to work with Tailwind CSS:

```svelte
<script lang="ts">
	import { Button } from 'alus-ui';
</script>

<!-- Primary button -->
<Button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" aria-label="Submit form">
	Submit
</Button>

<!-- Toggle button -->
<Button
	class="rounded px-4 py-2 {active ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}"
	aria-pressed={active}
	onclick={() => (active = !active)}
>
	{active ? 'Active' : 'Inactive'}
</Button>
```

## (°_°) Accessibility Features

Every alus-ui component includes:

- (^\_^) Semantic HTML elements
- (^\_^) ARIA attributes and roles
- (^\_^) Keyboard navigation support
- (^\_^) Focus management
- (^\_^) Screen reader announcements
- (^\_^) Error and validation states
- (^\_^) Visible focus indicators

WCAG 2.1 AA compliant out of the box.

## (・\_・) Documentation

- [Component Library README](packages/alus/README.md) - Detailed component API
- [Component Roadmap](docs/todos/ui-components-roadmap.md) - See what's coming next
- [Showcase App](http://localhost:5173) - Live demo of all components

## (^\_^)b Contributing

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

## (・\_・) Testing

```bash
# Run tests (Vitest)
pnpm test

# Type checking
pnpm check

# Linting
pnpm lint
```

## (>\_<) Publishing

The `alus-ui` package is published to npm from `packages/alus/` via [release-it](https://github.com/release-it/release-it) with conventional-changelog. See `packages/alus/README.md#releasing` for the full workflow.

```bash
cd packages/alus
pnpm release:dry      # preview bump, changelog, tag, publish
pnpm release          # interactive
pnpm release:patch    # 0.1.0 → 0.1.1
pnpm release:minor    # 0.1.0 → 0.2.0
pnpm release:major    # 0.1.0 → 1.0.0
```

Prereqs: clean `main`, `npm whoami` succeeds, `GITHUB_TOKEN` exported (else web fallback). The pipeline runs `pnpm check`, bumps version, runs `pnpm build`, writes `CHANGELOG.md`, commits, tags `v<version>`, pushes, creates the GitHub release, and runs `npm publish`.

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
- [npm Package](https://www.npmjs.com/package/alus-ui)
- [Component Library](./packages/alus/README.md)
- [Component Roadmap](./docs/todos/ui-components-roadmap.md)
- [Issue Tracker](https://github.com/Hanivan/alus/issues)

---

**Note**: This library is in active development. APIs may change before v1.0 release.

(^\_^)b If you like this project, please consider giving it a star on GitHub!
