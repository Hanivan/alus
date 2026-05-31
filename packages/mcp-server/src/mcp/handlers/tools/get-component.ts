import * as v from 'valibot';
import { tool } from 'tmcp/utils';
import { CATEGORIES } from '../../../constants.js';
import { list_all_components, read_component_source, truncate } from '../../../lib/fs.js';
import type { AlusMcp } from '../../index.js';

const schema = v.object({
	name: v.pipe(
		v.string(),
		v.description("Component name, case-insensitive (e.g. 'Button', 'accordion', 'date-picker')"),
	),
	category: v.optional(v.picklist(CATEGORIES, 'Narrow search when name is ambiguous')),
});

export function get_component(server: AlusMcp) {
	server.tool(
		{
			name: 'alus_get_component',
			description:
				"Read the full source of an alus-ui component (.svelte + index.ts). Use alus_list_components first to find valid names. Supports partial, case-insensitive matching (e.g. 'button', 'Button', 'date-picker').",
			schema,
			annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
		},
		async ({ name, category }) => {
			try {
				const all = await list_all_components();
				const needle = name.toLowerCase().replace(/[-_\s]/g, '');
				let matches = all.filter(
					(c) => c.name.toLowerCase().replace(/[-_\s]/g, '') === needle,
				);
				if (category) matches = matches.filter((c) => c.category === category);

				if (!matches.length) {
					const similar = all
						.filter(
							(c) =>
								c.name.toLowerCase().includes(needle) ||
								needle.includes(c.name.toLowerCase()),
						)
						.map((c) => `${c.name} (${c.category})`)
						.slice(0, 5)
						.join(', ');
					return tool.text(
						`Component '${name}' not found.${similar ? ` Similar: ${similar}` : ' Use alus_list_components to browse.'}`,
					);
				}

				const entry = matches[0]!;
				const src = await read_component_source(entry);
				return tool.text(
					truncate(
						`# ${entry.name} (${entry.category})\n\n${src}`,
						'Use alus_search_components for targeted lookup.',
					),
				);
			} catch (e) {
				return tool.error((e as Error).message);
			}
		},
	);
}
