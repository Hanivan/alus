import { ValibotJsonSchemaAdapter } from '@tmcp/adapter-valibot';
import { McpServer } from 'tmcp';
import { setup_tools } from './handlers/index.js';

export const server = new McpServer(
	{
		name: 'alus-ui MCP',
		version: '0.0.1',
		description: 'MCP server for the alus-ui Svelte 5 component library',
	},
	{
		adapter: new ValibotJsonSchemaAdapter(),
		capabilities: { tools: {} },
		instructions:
			'This MCP server provides direct access to alus-ui — an unstyled, accessible Svelte 5 component library. Use it to browse components, read source, search patterns, and find usage examples. Always call alus_list_components first to discover available components.',
	},
).withContext<{ alus_root?: string }>();

export type AlusMcp = typeof server;

setup_tools(server);
