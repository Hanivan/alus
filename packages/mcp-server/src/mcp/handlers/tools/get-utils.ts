import * as v from 'valibot';
import { tool } from 'tmcp/utils';
import { readFile } from 'node:fs/promises';
import { UTILS_ROOT } from '../../../constants.js';
import type { AlusMcp } from '../../index.js';

const MODULES = ['aria', 'focus', 'id', 'keyboard', 'index', 'form/state'] as const;

const schema = v.object({
	module: v.picklist(MODULES, "Utility module — one of: aria, focus, id, keyboard, index, form/state"),
});

export function get_utils(server: AlusMcp) {
	server.tool(
		{
			name: 'alus_get_utils',
			description:
				'Read source of an alus-ui utility module (a11y helpers, form state). Available: aria, focus, id, keyboard, index, form/state.',
			schema,
			annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
		},
		async ({ module }) => {
			try {
				const path =
					module === 'index'
						? `${UTILS_ROOT}/a11y/index.ts`
						: module === 'form/state'
							? `${UTILS_ROOT}/form/state.ts`
							: `${UTILS_ROOT}/a11y/${module}.ts`;
				const content = await readFile(path, 'utf-8');
				return tool.text(`\`\`\`typescript\n${content}\n\`\`\``);
			} catch (e) {
				return tool.error((e as Error).message);
			}
		},
	);
}
