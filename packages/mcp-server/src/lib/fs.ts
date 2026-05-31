import { readdir, readFile } from 'node:fs/promises';
import { CATEGORIES, COMPONENTS_DIR, CHARACTER_LIMIT, type Category } from '../constants.js';
import { BUNDLED_DATA } from '../generated/data.js';

export interface ComponentEntry {
	name: string;
	category: Category;
	dir: string;
	files: string[];
	_bundled_files?: Record<string, string>;
}

const USE_FS = !!process.env.ALUS_ROOT || !BUNDLED_DATA;

export async function list_all_components(): Promise<ComponentEntry[]> {
	if (!USE_FS && BUNDLED_DATA) {
		return BUNDLED_DATA.components.map((c) => ({
			name: c.name,
			category: c.category as Category,
			dir: `${COMPONENTS_DIR}/${c.category}/${c.slug}`,
			files: Object.keys(c.files),
			_bundled_files: c.files
		}));
	}

	const entries: ComponentEntry[] = [];
	for (const category of CATEGORIES) {
		const cat_dir = `${COMPONENTS_DIR}/${category}`;
		let items: string[];
		try {
			items = await readdir(cat_dir);
		} catch {
			continue;
		}
		for (const item of items) {
			const comp_dir = `${cat_dir}/${item}`;
			let files: string[];
			try {
				files = await readdir(comp_dir);
			} catch {
				continue;
			}
			const source_files = files.filter((f) => f.endsWith('.svelte') || f.endsWith('.ts'));
			if (!source_files.length) continue;
			const name = item
				.split('-')
				.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
				.join('');
			entries.push({ name, category, dir: comp_dir, files: source_files });
		}
	}
	return entries;
}

export async function read_component_source(entry: ComponentEntry): Promise<string> {
	const parts: string[] = [];
	for (const file of entry.files) {
		let content: string;
		if (entry._bundled_files) {
			content = entry._bundled_files[file] ?? '';
		} else {
			content = await readFile(`${entry.dir}/${file}`, 'utf-8');
		}
		parts.push(`// FILE: ${file}\n${content}`);
	}
	return parts.join('\n\n');
}

export function read_bundled_file(key: string): string | null {
	if (BUNDLED_DATA) return BUNDLED_DATA.files[key] ?? null;
	return null;
}

export function truncate(text: string, hint: string): string {
	if (text.length <= CHARACTER_LIMIT) return text;
	return text.slice(0, CHARACTER_LIMIT) + `\n\n[... truncated. ${hint}]`;
}
