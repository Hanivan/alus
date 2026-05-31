import { readdir, readFile } from 'node:fs/promises';
import { CATEGORIES, COMPONENTS_DIR, CHARACTER_LIMIT, type Category } from '../constants.js';

export interface ComponentEntry {
	name: string;
	category: Category;
	dir: string;
	files: string[];
}

export async function list_all_components(): Promise<ComponentEntry[]> {
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
		const content = await readFile(`${entry.dir}/${file}`, 'utf-8');
		parts.push(`// FILE: ${file}\n${content}`);
	}
	return parts.join('\n\n');
}

export function truncate(text: string, hint: string): string {
	if (text.length <= CHARACTER_LIMIT) return text;
	return text.slice(0, CHARACTER_LIMIT) + `\n\n[... truncated. ${hint}]`;
}
