import type { AlusMcp } from '../index.js';
import * as tools from './tools/index.js';

export function setup_tools(server: AlusMcp) {
	for (const tool in tools) {
		tools[tool as keyof typeof tools](server);
	}
}
