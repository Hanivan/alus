# Contributing to alus-ui

## \(^o^)/ Getting Started

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

## (・\_・) Development Workflow

### 1. Choose What to Work On

- [Component Roadmap](docs/todos/ui-components-roadmap.md)
- [GitHub Issues](https://github.com/Hanivan/alus/issues)

### 2. Create a Branch

```bash
git checkout -b feat/your-component-name
git checkout -b fix/issue-description
```

### 3. Implement Changes

#### Adding a New Component

**Directory structure** (mandatory):

```
packages/alus/src/lib/components/{category}/{component-lowercase}/
├── ComponentName.svelte
└── index.ts               # must be .ts, NOT .js
```

**`index.ts`** format:

```ts
export { default as ComponentName } from './ComponentName.svelte';
```

**Component template** — always use ARIA helpers, never inline `aria-*`:

```svelte
<script lang="ts">
  import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';

  interface Props {
    children?: import('svelte').Snippet;
    class?: string;
    disabled?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
  }

  let {
    children,
    class: className = '',
    disabled = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
  }: Props = $props();

  const ariaAttrs = $derived(
    mergeAttrs(
      labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
      interactiveStateAttrs({ disabled })
    )
  );
</script>

<button type="button" class={className} {disabled} {...ariaAttrs}>
  {#if children}{@render children()}{/if}
</button>
```

**Checklist:**

1. Create `.svelte` + `index.ts` in `packages/alus/src/lib/components/{category}/{name}/`
2. Re-export from `packages/alus/src/lib/components/index.ts`
3. Add demo at `src/routes/components/{name}/+page.svelte` (see Japanese aesthetic template in `CLAUDE.md`)
4. All components must be: unstyled, WCAG 2.1 AA, Svelte 5 runes, TypeScript, keyboard accessible

### 4. Test

```bash
pnpm check    # type checking
pnpm test     # Vitest
pnpm lint     # Prettier + ESLint
pnpm format   # format
```

### 5. Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/) — release-it parses these for version bumps and changelog:

| Prefix | Bump | Changelog section |
|---|---|---|
| `feat:` | minor | Features |
| `fix:` | patch | Bug Fixes |
| `refactor:` | patch | Refactors |
| `docs:` | patch | Documentation |
| `feat!:` / `fix!:` | major | Breaking Changes |
| `chore:` `ci:` `style:` | — | hidden |

### 6. Pull Request

- Clear description + link to issues
- Screenshots for UI changes

## (・\_・) Coding Standards

### Svelte 5 Runes Only

No legacy mode anywhere:

```svelte
<!-- Good -->
let { count = 0 }: Props = $props();
let doubled = $derived(count * 2);

<!-- Bad -->
export let count = 0;
$: doubled = count * 2;
```

### Effects and Listeners

- **No `onMount` / `onDestroy`** — use `$effect(() => { ...; return cleanup; })`
- **No raw `addEventListener` on `document` / `window`** — use `useEventListener` from `runed` with a gated target getter:

```ts
import { useEventListener } from 'runed';

useEventListener(
  () => (open ? document : null),
  'keydown',
  (e) => { if (e.key === 'Escape') close(); }
);
```

### Accessibility

1. Semantic HTML
2. All ARIA via `labelAttrs` / `validationAttrs` / `interactiveStateAttrs` / `widgetAttrs` / `mergeAttrs` — never inline strings
3. ARIA value types from `$types/index.ts` (derived from `svelte/elements`) — never redeclare literal unions
4. Keyboard: Enter, Space, Escape, Arrow keys, Home/End, Tab
5. Focus: `trap` + `focusFirst` for modals; roving tabindex for composite widgets; visible indicators
6. Screen reader: `<VisuallyHidden>` for SR-only text — never inline `style="position:absolute…"` or `sr-only`
7. Form validation: `validationAttrs({ invalid, required, errormessage })`
8. Virtualised lists: emit `aria-setsize` + `aria-posinset`

### Unstyled

- No default colors, spacing, or layout
- Works with Tailwind, CSS variables, plain CSS
- Never use `--cream` as background for white text (SubMenu incident)

## (・\_・) Testing

Uses Vitest + `@vitest/browser-playwright`:

```typescript
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import YourComponent from './YourComponent.svelte';

describe('YourComponent', () => {
  it('renders correctly', () => {
    const { getByRole } = render(YourComponent);
    expect(getByRole('button')).toBeTruthy();
  });
});
```

## (^\_^) MCP Development

The MCP server lives in `packages/mcp-server` and is wired into the showcase app via `src/hooks.server.ts`.

### Structure

```
packages/mcp-server/src/
├── constants.ts                   # ALUS_ROOT, component paths, CATEGORIES
├── lib/fs.ts                      # list_all_components, read_component_source, truncate
├── index.ts                       # re-exports server + AlusMcp type
└── mcp/
    ├── index.ts                   # McpServer instance (tmcp + ValibotJsonSchemaAdapter)
    └── handlers/
        ├── index.ts               # setup_tools() — registers all tools
        └── tools/
            ├── index.ts           # barrel export
            ├── list-components.ts
            ├── get-component.ts
            ├── search-components.ts
            ├── get-component-demo.ts
            ├── list-exports.ts
            └── get-utils.ts

packages/mcp-stdio/src/
└── index.ts                       # StdioTransport entry (tsx shebang)

src/
├── lib/mcp/index.ts               # HttpTransport for /mcp endpoint
└── hooks.server.ts                # SvelteKit handle hook — routes /mcp
```

### Adding a Tool

1. Create `packages/mcp-server/src/mcp/handlers/tools/{name}.ts`:

```ts
import * as v from 'valibot';
import { tool } from 'tmcp/utils';
import type { AlusMcp } from '../../index.js';

const schema = v.object({
  query: v.pipe(v.string(), v.description('...')),
});

export function my_tool(server: AlusMcp) {
  server.tool(
    {
      name: 'alus_my_tool',
      description: 'What this tool does.',
      schema,
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async (params) => {
      try {
        return tool.text('result');
      } catch (e) {
        return tool.error((e as Error).message);
      }
    },
  );
}
```

2. Export from `packages/mcp-server/src/mcp/handlers/tools/index.ts` — `setup_tools()` picks it up automatically.

### Running Locally

**Stdio (for Claude Code / MCP Inspector):**

```bash
pnpm --filter alus-ui-mcp run start   # tsx, no build needed
pnpm --filter alus-ui-mcp run dev     # watch mode
```

**Build compiled binary:**

```bash
pnpm --filter alus-ui-mcp run build   # outputs dist/index.js via tsup
```

**Test via MCP Inspector:**

```bash
pnpm dlx @modelcontextprotocol/inspector pnpm --filter alus-ui-mcp run start
```

**HTTP (via showcase dev server):**

```bash
pnpm dev:showcase
# /mcp is live at http://localhost:5173/mcp
# Note: browser GET redirects to GitHub — use an MCP client (POST) to interact
```

### Claude Code Config (contributors)

This config is for working inside the alus repo. Build the MCP package first:

```bash
pnpm --filter alus-ui-mcp build
```

Then add to `.mcp.json` at your project root:

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

Replace `path/to/alus` with your clone path. `${HOME}` is expanded by Claude Code — `cwd` is not supported in `.mcp.json`.

Library users (not contributing to alus) should use `npx alus-ui-mcp` instead — see [packages/mcp-stdio/README.md](packages/mcp-stdio/README.md).

### Remote Endpoint

The production Cloudflare deployment exposes:

```
https://alus.lkmn.link/mcp
```

Claude Code remote config:

```json
{
  "mcpServers": {
    "alus-ui": {
      "url": "https://alus.lkmn.link/mcp"
    }
  }
}
```

## (>\_<) Releasing

### Component library (`alus-ui`)

```bash
cd packages/alus
pnpm release:dry    # preview bump, changelog, tag
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

## (x_x) Reporting Issues

1. Search existing issues first
2. Include: reproduction snippet, expected vs actual, browser/OS/Svelte version

## (ಠ_ಠ) Code of Conduct

Respectful, inclusive, constructive.

## (・\_・) Resources

- [Svelte 5 Docs](https://svelte.dev/docs)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [tmcp](https://github.com/tmcp/tmcp)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [CLAUDE.md](CLAUDE.md) — full project conventions (authoritative)
