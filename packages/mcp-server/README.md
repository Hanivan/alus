# @alus-ui/mcp-server

> Internal MCP tool definitions for the alus-ui component library. **Private package — not published to npm.**

Used by [`alus-ui-mcp`](../mcp-stdio) (stdio CLI) and the root SvelteKit app (`/mcp` HTTP endpoint).

## Structure

```
src/
├── constants.ts               # ALUS_ROOT, COMPONENTS_DIR, ROUTES_DIR, UTILS_ROOT, CATEGORIES
├── lib/fs.ts                  # list_all_components, read_component_source, truncate
├── index.ts                   # exports: server, AlusMcp
└── mcp/
    ├── index.ts               # McpServer instance (tmcp + ValibotJsonSchemaAdapter)
    └── handlers/
        ├── index.ts           # setup_tools()
        └── tools/
            ├── index.ts
            ├── list-components.ts
            ├── get-component.ts
            ├── search-components.ts
            ├── get-component-demo.ts
            ├── list-exports.ts
            └── get-utils.ts
```

## Tools

| Tool                      | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `alus_list_components`    | List all components, optionally filtered by category     |
| `alus_get_component`      | Read full source of a component (`.svelte` + `index.ts`) |
| `alus_search_components`  | Full-text search across all component source files       |
| `alus_get_component_demo` | Read showcase demo page for a component                  |
| `alus_list_exports`       | Show full `components/index.ts` public API               |
| `alus_get_utils`          | Read a11y/form utility module source                     |

## Adding a Tool

1. Create `src/mcp/handlers/tools/{name}.ts`:

```ts
import * as v from 'valibot';
import { tool } from 'tmcp/utils';
import type { AlusMcp } from '../../index.js';

const schema = v.object({
	query: v.pipe(v.string(), v.description('...'))
});

export function my_tool(server: AlusMcp) {
	server.tool(
		{
			name: 'alus_my_tool',
			description: 'What this does.',
			schema,
			annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
		},
		async (params) => {
			try {
				return tool.text('result');
			} catch (e) {
				return tool.error((e as Error).message);
			}
		}
	);
}
```

2. Export from `src/mcp/handlers/tools/index.ts` — `setup_tools()` auto-registers it.

## Environment

`ALUS_ROOT` — override the repo root path (default: resolved from `packages/mcp-server/` up two levels).

## Stack

- [tmcp](https://github.com/tmcp/tmcp) — MCP server framework
- [@tmcp/adapter-valibot](https://github.com/tmcp/tmcp) — Valibot schema adapter
- [valibot](https://valibot.dev) — schema validation
