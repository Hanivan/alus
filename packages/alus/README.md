# alus-ui

> **Unstyled, accessible Svelte 5 components** with full keyboard navigation and WCAG 2.1 AA compliance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.55-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-alus--ui-critical)](https://www.npmjs.com/package/alus-ui)

## Installation

```bash
pnpm add alus-ui
# or
npm install alus-ui
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
- **Feedback** (13): Badge, Tag, Spinner, Skeleton, Progress, Alert, Callout, Banner, InlineMessage, LiveRegion, NotificationBell, Toast + Toaster
- **Display** (18): Divider, Kbd, AspectRatio, Frame, Timestamp, CodeBlock, StatCard, Avatar, Card, Image, List, DataList, Table, TreeView, Timeline, Compare, Carousel
- **Overlay** (10): Modal, Dialog, Drawer, Sheet, Tooltip, Popover, Dropdown, Overlay, Lightbox, ContextMenu
- **Layout** (6): Stack, Flex, Grid, Container, Spacer, Columns
- **Interactive** (8): Sortable, Swipeable, Resizable, SplitView, Draggable, Droppable, InfiniteScroll, VirtualList
- **Utility** (5): VisuallyHidden, Portal, FocusTrap, ScreenReaderOnly, Conditional

Date components use [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/) for locale/timezone/non-Gregorian-calendar correctness.

**Out of scope** (use external libs): `RichTextEditor`, `DataGrid`, `Chart`, `VideoPlayer`, `AudioPlayer`, `MapView`.

## Styling

Components are unstyled — bring your own styles via Tailwind CSS or plain CSS:

```svelte
<script lang="ts">
	import { Button } from 'alus-ui';
</script>

<Button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Submit</Button>
```

## Accessibility

Every component includes:

- Semantic HTML elements
- ARIA attributes via shared helpers (`labelAttrs`, `validationAttrs`, `interactiveStateAttrs`, `widgetAttrs`)
- Full keyboard navigation (Enter, Space, Escape, Arrow keys, Home/End)
- Focus management with visible indicators
- Screen reader announcements via `<VisuallyHidden>`
- Form validation states (`aria-invalid`, `aria-errormessage`)

WCAG 2.1 AA compliant out of the box.

## Shared ARIA Props

Most components accept:

```ts
'aria-label'?: string
'aria-labelledby'?: string
'aria-describedby'?: string
class?: string
```

Interactive components additionally accept `disabled`, `aria-pressed`, `aria-expanded`, `aria-checked`, `aria-selected`, `aria-current`.

Form components additionally accept `required`, `aria-invalid`, `aria-errormessage`.

## Utilities

```ts
import {
	labelAttrs,
	validationAttrs,
	interactiveStateAttrs,
	widgetAttrs,
	mergeAttrs
} from 'alus-ui/a11y';
import { trap, focusFirst } from 'alus-ui/a11y';
```

See `src/lib/utils/a11y/` for full reference.

## Browser Support

Chrome/Edge, Firefox, Safari (latest), iOS Safari, Chrome Mobile.

## Releasing

```bash
pnpm release:dry    # preview bump, changelog, tag
pnpm release        # interactive
pnpm release:patch  # 0.1.0 → 0.1.1
pnpm release:minor  # 0.1.0 → 0.2.0
pnpm release:major  # 0.1.0 → 1.0.0
```

Prereqs: clean `main`, `npm whoami` succeeds, `GITHUB_TOKEN` exported. Pipeline: `pnpm check` → version bump → `pnpm build` → `CHANGELOG.md` → commit → tag → push → GitHub release → `npm publish`.

## License

MIT — [GitHub](https://github.com/Hanivan/alus) · [Issues](https://github.com/Hanivan/alus/issues)
