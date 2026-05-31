import * as v from 'valibot';
import { tool } from 'tmcp/utils';
import { readFile } from 'node:fs/promises';
import { CATEGORIES } from '../../../constants.js';
import { list_all_components, truncate } from '../../../lib/fs.js';
import type { AlusMcp } from '../../index.js';

const schema = v.object({
	query: v.pipe(v.string(), v.minLength(2), v.description('Case-insensitive search string')),
	category: v.optional(v.picklist(CATEGORIES)),
	limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50)), 20),
	response_format: v.optional(v.picklist(['markdown', 'json']), 'markdown')
});

export function search_components(server: AlusMcp) {
	server.tool(
		{
			name: 'alus_search_components',
			description:
				'Full-text search across all alus-ui component source files. Useful for finding which component uses a specific prop, ARIA pattern, utility function, or type. Returns matches with ±2 lines of context.',
			schema,
			annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
		},
		async ({ query, category, limit = 20, response_format = 'markdown' }) => {
			try {
				const all = await list_all_components();
				const pool = category ? all.filter((c) => c.category === category) : all;
				const needle = query.toLowerCase();

				interface Hit {
					component: string;
					category: string;
					file: string;
					line: number;
					context: string;
				}

				const hits: Hit[] = [];
				for (const entry of pool) {
					if (hits.length >= limit) break;
					for (const file of entry.files) {
						if (hits.length >= limit) break;
						let content: string;
						if (entry._bundled_files) {
							content = entry._bundled_files[file] ?? '';
						} else {
							content = await readFile(`${entry.dir}/${file}`, 'utf-8');
						}
						const lines = content.split('\n');
						for (let i = 0; i < lines.length; i++) {
							if (lines[i]!.toLowerCase().includes(needle)) {
								const start = Math.max(0, i - 2);
								const end = Math.min(lines.length - 1, i + 2);
								hits.push({
									component: entry.name,
									category: entry.category,
									file,
									line: i + 1,
									context: lines.slice(start, end + 1).join('\n')
								});
								if (hits.length >= limit) break;
							}
						}
					}
				}

				if (!hits.length) return tool.text(`No results for '${query}'.`);

				if (response_format === 'json') {
					return tool.text(JSON.stringify({ query, total: hits.length, hits }, null, 2));
				}

				const lines = [`# Search: '${query}' — ${hits.length} hit(s)`, ''];
				for (const h of hits) {
					lines.push(
						`## ${h.component} (${h.category}) · ${h.file}:${h.line}`,
						'```svelte',
						h.context,
						'```',
						''
					);
				}
				return tool.text(
					truncate(lines.join('\n'), 'Narrow with category or a more specific query.')
				);
			} catch (e) {
				return tool.error((e as Error).message);
			}
		}
	);
}
