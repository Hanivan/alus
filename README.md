# alus-ui - Svelte 5 Component Library

> **Unstyled, accessible Svelte 5 components** with full keyboard navigation and WCAG 2.1 AA compliance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.55-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-alus--ui-critical)](https://www.npmjs.com/package/alus-ui)

## (☆^O^☆) What is alus-ui?

A monorepo containing:

| Package | Description |
|---|---|
| `packages/alus` | Component library — published as [`alus-ui`](https://www.npmjs.com/package/alus-ui) |
| `packages/mcp-server` | MCP tool definitions (`@alus-ui/mcp-server`, private) |
| `packages/mcp-stdio` | MCP stdio CLI entry — published as [`alus-ui-mcp`](https://www.npmjs.com/package/alus-ui-mcp) |
| `/` (root) | SvelteKit showcase app — deployed on Cloudflare, serves `/mcp` HTTP endpoint |

### Features

- (°_°) **Accessible** — WCAG 2.1 AA compliant
- (・\_・) **Keyboard-Friendly** — Full keyboard navigation
- (☆^\_☆) **Unstyled** — Complete styling freedom
- (☆^O^☆) **Svelte 5 Native** — Runes mode only (`$props`, `$derived`, `$state`)
- (^\_^) **Type-Safe** — Full TypeScript support
- (^\_^)b **Tree-Shakeable** — Import only what you need
- (^\_^) **MCP-Powered** — LLM-accessible via Model Context Protocol

## \(^o^)/ Quick Start

```bash
pnpm add alus-ui
```

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
alus/
├── packages/
│   ├── alus/                    # alus-ui component library
│   │   └── src/lib/
│   │       ├── components/      # form/ navigation/ feedback/ display/
│   │       │                    # overlay/ layout/ interactive/ utility/
│   │       ├── utils/a11y/      # ARIA helpers, focus mgmt, ID generation
│   │       ├── utils/form/      # Form field helpers
│   │       └── types/           # TypeScript types
│   ├── mcp-server/              # @alus-ui/mcp-server (private)
│   │   └── src/
│   │       ├── constants.ts     # ALUS_ROOT, paths, CATEGORIES
│   │       ├── lib/fs.ts        # Shared filesystem helpers
│   │       ├── mcp/index.ts     # McpServer instance (tmcp)
│   │       └── mcp/handlers/    # Tool implementations
│   └── mcp-stdio/               # alus-ui-mcp (publishable CLI)
│       └── src/index.ts         # StdioTransport entry
├── src/
│   ├── routes/                  # Showcase app routes
│   ├── lib/mcp/index.ts         # HttpTransport for /mcp endpoint
│   └── hooks.server.ts          # SvelteKit hook — routes /mcp requests
├── docs/todos/                  # Roadmap + a11y plans
├── pnpm-workspace.yaml
└── CLAUDE.md                    # Project conventions (authoritative)
```

## (・\_・) Development

### Prerequisites

- Node.js >= 18
- pnpm >= 11

### Setup

```bash
git clone https://github.com/Hanivan/alus.git
cd alus
pnpm install
pnpm dev
```

`pnpm dev` starts:
- **Library watcher** — `packages/alus` in watch mode
- **Showcase app** — `http://localhost:5173`

### Scripts

```bash
# Development
pnpm dev                # Library watcher + showcase app
pnpm dev:showcase       # Showcase only

pnpm --filter alus-ui dev        # Library watcher only
pnpm --filter alus-ui-mcp start  # MCP stdio server (tsx, no build)
pnpm --filter alus-ui-mcp build  # Compile MCP to dist/ (tsup)

# Building
pnpm build                       # Build showcase app (Cloudflare)
pnpm --filter alus-ui build      # Build component library

# Deploying
wrangler deploy                  # Deploy showcase app + /mcp to Cloudflare

# Quality
pnpm check     # svelte-check type checking
pnpm lint      # Prettier + ESLint
pnpm format    # Format with Prettier
pnpm test      # Vitest
```

## (^\_^) Available Components

The canonical list lives in `packages/alus/src/lib/components/index.ts`.

- **Form** (27): Button, Input, Checkbox, Radio, RadioGroup, Select, Textarea, Switch, Slider, FileInput, SearchInput, NumberInput, Form, Fieldset, Label, FieldError, InputGroup, Rating, IconButton, ToggleButton, AutoComplete, Calendar, DatePicker, DateRange, DateRangePicker, TimePicker, ColorPicker
- **Navigation** (11): Tabs, Accordion, Breadcrumb, Pagination, Link, ExternalLink, Navigation, Menu, SubMenu, Stepper, CommandMenu
- **Feedback** (13): Badge, Tag, Spinner, Skeleton, Progress, Alert, Callout, Banner, InlineMessage, LiveRegion, NotificationBell, Toast + Toaster
- **Display** (18): Divider, Kbd, AspectRatio, Frame, Timestamp, CodeBlock, StatCard, Avatar, Card, Image, List, DataList, Table, TreeView, Timeline, Compare, Carousel
- **Overlay** (10): Modal, Dialog, Drawer, Sheet, Tooltip, Popover, Dropdown, Overlay, Lightbox, ContextMenu
- **Layout** (6): Stack, Flex, Grid, Container, Spacer, Columns
- **Interactive** (8): Sortable, Swipeable, Resizable, SplitView, Draggable, Droppable, InfiniteScroll, VirtualList
- **Utility** (5): VisuallyHidden, Portal, FocusTrap, ScreenReaderOnly, Conditional

## (^\_^) MCP Integration

alus-ui ships an MCP server that gives LLMs direct access to component source, demos, exports, and utilities.

### Tools

| Tool | Description |
|---|---|
| `alus_list_components` | Browse all 150+ components by category |
| `alus_get_component` | Read full `.svelte` + `index.ts` source |
| `alus_search_components` | Full-text search across all source files |
| `alus_get_component_demo` | Read showcase demo pages |
| `alus_list_exports` | Show full public API (`components/index.ts`) |
| `alus_get_utils` | Read a11y/form utility module source |

### Claude Code — library users (recommended)

Add to `.mcp.json` at your project root:

```json
{
  "mcpServers": {
    "alus-ui": {
      "type": "stdio",
      "command": "npx",
      "args": ["alus-ui-mcp"]
    }
  }
}
```

### Claude Code — alus monorepo contributors only

Build first:

```bash
pnpm --filter alus-ui-mcp build
```

Then add to `.mcp.json` at your project root (replace `path/to/alus`):

```json
{
  "mcpServers": {
    "alus-ui": {
      "type": "stdio",
      "command": "node",
      "args": ["${HOME}/path/to/alus/packages/mcp-stdio/dist/index.js"],
      "env": {
        "ALUS_ROOT": "${HOME}/path/to/alus"
      }
    }
  }
}
```

### Remote (HTTP)

The deployed Cloudflare app exposes `/mcp`. Point your MCP client to:

```
https://alus.lkmn.link/mcp
```

See [MCP Development](#mcp-development) for details.

## (☆^\_☆) Styling with Tailwind CSS

```svelte
<script lang="ts">
  import { Button } from 'alus-ui';
</script>

<Button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
  Submit
</Button>
```

## (>\_<) Publishing

### Component library (`alus-ui`)

```bash
cd packages/alus
pnpm release:dry    # preview
pnpm release        # interactive
pnpm release:patch  # 0.1.0 → 0.1.1
pnpm release:minor  # 0.1.0 → 0.2.0
pnpm release:major  # 0.1.0 → 1.0.0
```

Prereqs: clean `main`, `npm whoami` succeeds, `GITHUB_TOKEN` exported. Pipeline: `pnpm check` → version bump → `pnpm build` → `CHANGELOG.md` → commit → tag → push → GitHub release → `npm publish`.

### MCP CLI (`alus-ui-mcp`)

```bash
cd packages/mcp-stdio
pnpm release:dry     # preview bump, changelog, tag
pnpm release         # interactive
pnpm release:patch   # 0.0.1 → 0.0.2
pnpm release:minor   # 0.0.1 → 0.1.0
pnpm release:major   # 0.0.1 → 1.0.0
```

Prereqs: clean `main`, `npm whoami` succeeds, `GITHUB_TOKEN` exported. Pipeline: version bump → `pnpm build` (tsup bundles to `dist/`) → `CHANGELOG.md` → commit → tag `mcp-vX.Y.Z` → push → GitHub release → `npm publish`.

## (O_O) Browser Support

Chrome/Edge, Firefox, Safari (latest), iOS Safari, Chrome Mobile.

## 📄 License

MIT

## (º_º) Links

- [npm: alus-ui](https://www.npmjs.com/package/alus-ui)
- [npm: alus-ui-mcp](https://www.npmjs.com/package/alus-ui-mcp)
- [GitHub](https://github.com/Hanivan/alus)
- [Issues](https://github.com/Hanivan/alus/issues)
- [Component Library README](packages/alus/README.md)
- [Contributing](CONTRIBUTING.md)
- [Roadmap](docs/todos/ui-components-roadmap.md)

---

**Note**: Active development — APIs may change before v1.0.

(^\_^)b If you like this project, give it a star on GitHub!
