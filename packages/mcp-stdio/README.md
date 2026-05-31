# alus-ui-mcp

> MCP stdio server for the [alus-ui](https://www.npmjs.com/package/alus-ui) Svelte 5 component library.

Gives LLMs (Claude, Cursor, etc.) direct access to alus-ui component source, demos, exports, and utilities via the [Model Context Protocol](https://modelcontextprotocol.io).

## Usage

### npx (no install)

```bash
npx alus-ui-mcp
```

### Claude Code

Add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "alus-ui": {
      "command": "npx",
      "args": ["alus-ui-mcp"]
    }
  }
}
```

Or if working inside the alus monorepo:

```json
{
  "mcpServers": {
    "alus-ui": {
      "command": "pnpm",
      "args": ["--filter", "alus-ui-mcp", "run", "start"],
      "cwd": "/path/to/alus"
    }
  }
}
```

### Remote HTTP

The production Cloudflare deployment exposes `/mcp`. Point your client to:

```json
{
  "mcpServers": {
    "alus-ui": {
      "url": "https://alus.lkmn.link/mcp"
    }
  }
}
```

## Tools

| Tool | Description |
|---|---|
| `alus_list_components` | Browse all 150+ components by category |
| `alus_get_component` | Read full `.svelte` + `index.ts` source |
| `alus_search_components` | Full-text search across all source files |
| `alus_get_component_demo` | Read showcase demo page |
| `alus_list_exports` | Show full public API (`components/index.ts`) |
| `alus_get_utils` | Read a11y/form utility module source |

## Development

```bash
# from repo root
pnpm --filter alus-ui-mcp run start   # run stdio server (tsx, no build)
pnpm --filter alus-ui-mcp run dev     # watch mode (tsx)
pnpm --filter alus-ui-mcp run build   # compile to dist/ via tsup
```

## Releasing

```bash
cd packages/mcp-stdio
pnpm release:dry     # preview bump, changelog, tag
pnpm release         # interactive
pnpm release:patch   # 0.0.1 → 0.0.2
pnpm release:minor   # 0.0.1 → 0.1.0
pnpm release:major   # 0.0.1 → 1.0.0
```

Prereqs: clean `main`, `npm whoami` succeeds, `GITHUB_TOKEN` exported. Pipeline: version bump → `pnpm build` → `CHANGELOG.md` → commit → tag `mcp-vX.Y.Z` → push → GitHub release → `npm publish`.

## Environment

`ALUS_ROOT` — override the alus repo root path (default: auto-detected from package location).

## License

MIT — part of the [alus](https://github.com/Hanivan/alus) monorepo.
