import * as v from 'valibot';
import { tool } from 'tmcp/utils';
import { CATEGORIES, COMPONENTS_DIR } from '../../../constants.js';
import { list_all_components } from '../../../lib/fs.js';
import type { AlusMcp } from '../../index.js';

const schema = v.object({
	category: v.optional(
		v.picklist(CATEGORIES, 'Must be one of the alus-ui component categories'),
	),
	response_format: v.optional(v.picklist(['markdown', 'json']), 'markdown'),
});

export async function list_components_handler(
	params: v.InferInput<typeof schema>,
): Promise<string> {
	const { category, response_format = 'markdown' } = params;
	const all = await list_all_components();
	const filtered = category ? all.filter((c) => c.category === category) : all;

	if (response_format === 'json') {
		return JSON.stringify(
			{
				total: filtered.length,
				components: filtered.map((c) => ({
					name: c.name,
					category: c.category,
					dir: c.dir.replace(`${COMPONENTS_DIR}/`, ''),
				})),
			},
			null,
			2,
		);
	}

	const grouped: Record<string, string[]> = {};
	for (const c of filtered) {
		(grouped[c.category] ??= []).push(c.name);
	}
	const lines = [`# alus-ui Components (${filtered.length} total)`, ''];
	for (const [cat, names] of Object.entries(grouped)) {
		lines.push(`## ${cat}`, '', names.map((n) => `- ${n}`).join('\n'), '');
	}
	return lines.join('\n');
}

export function list_components(server: AlusMcp) {
	server.tool(
		{
			name: 'alus_list_components',
			description:
				'List all components in the alus-ui Svelte 5 library grouped by category. Call this first to discover component names before using alus_get_component. Optionally filter by category.',
			schema,
			annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
		},
		async (params) => {
			try {
				return tool.text(await list_components_handler(params));
			} catch (e) {
				return tool.error((e as Error).message);
			}
		},
	);
}
