import { tool } from 'tmcp/utils';
import { readFile } from 'node:fs/promises';
import { COMPONENTS_DIR } from '../../../constants.js';
import { read_bundled_file } from '../../../lib/fs.js';
import type { AlusMcp } from '../../index.js';

export function list_exports(server: AlusMcp) {
	server.tool(
		{
			name: 'alus_list_exports',
			description:
				'Return the full contents of packages/alus/src/lib/components/index.ts — the canonical public API of alus-ui with exact import paths, exported types, and context helpers.',
			annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
		},
		async () => {
			try {
				const content =
					read_bundled_file('components/index.ts') ??
					(await readFile(`${COMPONENTS_DIR}/index.ts`, 'utf-8'));
				return tool.text(`\`\`\`typescript\n${content}\n\`\`\``);
			} catch (e) {
				return tool.error((e as Error).message);
			}
		},
	);
}
