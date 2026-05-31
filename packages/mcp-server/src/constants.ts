import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// packages/mcp-server → packages → repo root
const PKG_DIR = fileURLToPath(new URL('..', import.meta.url));
export const ALUS_ROOT = process.env.ALUS_ROOT ?? resolve(PKG_DIR, '../..');

export const COMPONENTS_DIR = `${ALUS_ROOT}/packages/alus/src/lib/components`;
export const ROUTES_DIR = `${ALUS_ROOT}/src/routes/components`;
export const UTILS_ROOT = `${ALUS_ROOT}/packages/alus/src/lib/utils`;
export const CHARACTER_LIMIT = 25000;

export const CATEGORIES = [
	'form',
	'navigation',
	'feedback',
	'display',
	'overlay',
	'layout',
	'interactive',
	'utility'
] as const;

export type Category = (typeof CATEGORIES)[number];
