# alus-ui-mcp

> MCP stdio server for the [alus-ui](https://www.npmjs.com/package/alus-ui) Svelte 5 component library.

Gives LLMs (Claude, Cursor, etc.) direct access to alus-ui component source, demos, exports, and utilities via the [Model Context Protocol](https://modelcontextprotocol.io).

## Usage

### npx (no install)

```bash
npx alus-ui-mcp
```

### Claude Code

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

## License

MIT — part of the [alus](https://github.com/Hanivan/alus) monorepo.
