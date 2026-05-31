import * as v from 'valibot';
import { tool } from 'tmcp/utils';
import { readFile, readdir } from 'node:fs/promises';
import { ROUTES_DIR } from '../../../constants.js';
import { truncate } from '../../../lib/fs.js';
import type { AlusMcp } from '../../index.js';

const schema = v.object({
	name: v.pipe(
		v.string(),
		v.description("Component route folder name, lowercase hyphenated (e.g. 'button', 'date-picker')"),
	),
});

export function get_component_demo(server: AlusMcp) {
	server.tool(
		{
			name: 'alus_get_component_demo',
			description:
				'Read the SvelteKit showcase demo page for a component. Shows real usage with props, events, and the Japanese Creative aesthetic. Path: src/routes/components/{name}/+page.svelte.',
			schema,
			annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
		},
		async ({ name }) => {
			try {
				const demo_path = `${ROUTES_DIR}/${name.toLowerCase()}/+page.svelte`;
				let content: string;
				try {
					content = await readFile(demo_path, 'utf-8');
				} catch {
					let available: string[] = [];
					try {
						available = await readdir(ROUTES_DIR);
					} catch { /* ignore */ }
					const hint = available.length
						? ` Available: ${available.slice(0, 10).join(', ')}${available.length > 10 ? '…' : ''}`
						: '';
					return tool.text(`Demo not found for '${name}'.${hint}`);
				}
				return tool.text(
					truncate(
						`# Demo: ${name}\n\`\`\`svelte\n${content}\n\`\`\``,
						'Use alus_get_component for source.',
					),
				);
			} catch (e) {
				return tool.error((e as Error).message);
			}
		},
	);
}
