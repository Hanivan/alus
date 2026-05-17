import { getContext, setContext } from 'svelte';

export interface TabsContext {
	value: () => string;
	setValue: (v: string) => void;
	orientation: () => 'horizontal' | 'vertical';
	activation: () => 'automatic' | 'manual';
	baseId: string;
}

const KEY = Symbol('alus-tabs');

export function setTabsContext(ctx: TabsContext) {
	setContext(KEY, ctx);
}

export function getTabsContext(): TabsContext {
	const ctx = getContext<TabsContext>(KEY);
	if (!ctx) throw new Error('Tabs subcomponents must be used inside <Tabs>');
	return ctx;
}

export const TAB_LIST_ATTR = 'data-alus-tab-list';
export const TAB_ATTR = 'data-alus-tab';
