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

The canonical export list is `src/lib/components/index.ts`.

- **Form** (27): Button, Input, Checkbox, Radio, RadioGroup, Select, Textarea, Switch, Slider, FileInput, SearchInput, NumberInput, Form, Fieldset, Label, FieldError, InputGroup, Rating, IconButton, ToggleButton, AutoComplete, Calendar, DatePicker, DateRange, DateRangePicker, TimePicker, ColorPicker
- **Navigation** (11): Tabs, Accordion, Breadcrumb, Pagination, Link, ExternalLink, Navigation, Menu, SubMenu, Stepper, CommandMenu
- **Feedback** (13): Badge, Tag, Spinner, Skeleton, Progress, Alert, Callout, Banner, InlineMessage, LiveRegion, NotificationBell, Toast (+ Toaster)
- **Display** (18): Divider, Kbd, AspectRatio, Frame, Timestamp, CodeBlock, StatCard, Avatar, Card, Image, List, DataList, Table, TreeView, Timeline, Compare, Carousel
- **Overlay** (10): Modal, Dialog, Drawer, Sheet, Tooltip, Popover, Dropdown, Overlay, Lightbox, ContextMenu
- **Layout** (6): Stack, Flex, Grid, Container, Spacer, Columns
- **Interactive** (8): Sortable, Swipeable, Resizable, SplitView, Draggable, Droppable, InfiniteScroll, VirtualList
- **Utility** (5): VisuallyHidden, Portal, FocusTrap, ScreenReaderOnly, Conditional

Date components use [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/) for locale/timezone/non-Gregorian-calendar correctness.

**Out of scope** (use external libs): `RichTextEditor`, `DataGrid`, `Chart`, `VideoPlayer`, `AudioPlayer`, `MapView`. `Clone` is not implementable (Svelte 5 lacks `cloneElement`).

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

Per-component prop documentation is not duplicated here — every component is fully typed, so use IDE IntelliSense or browse the source under `src/lib/components/{category}/{component}/`. Each component file has a `Props` interface at the top.

Live, interactive examples for every component are in the showcase app at `src/routes/components/{component}/+page.svelte` (run `pnpm dev` from the repo root).

### Shared ARIA props

Most components accept these standard accessibility props in addition to their own:

- `aria-label?: string`
- `aria-labelledby?: string`
- `aria-describedby?: string`
- `class?: string`

Interactive components additionally accept: `disabled`, `aria-disabled`, plus role-specific state like `aria-pressed`, `aria-expanded`, `aria-checked`, `aria-selected`, `aria-current`.

Form components additionally accept: `required`, `aria-invalid`, `aria-errormessage` (wired via the `validationAttrs` helper).

## Utilities

Beyond components, the package exports a small set of a11y/form utilities:

```ts
import { labelAttrs, validationAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from 'alus-ui/a11y';
import { trap, focusFirst } from 'alus-ui/a11y';
import { generateCounterId } from 'alus-ui/a11y';
import { createFieldIds, createFormField } from 'alus-ui/utils/form';
```

See `src/lib/utils/a11y/` and `src/lib/utils/form/` for full reference.

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
