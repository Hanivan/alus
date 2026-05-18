import { getContext, setContext } from 'svelte';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

const KEY = Symbol('alus:drawer-side');

export function setDrawerSide(getter: () => DrawerSide) {
	setContext(KEY, getter);
}

export function getDrawerSide(): () => DrawerSide {
	return getContext<() => DrawerSide>(KEY) ?? (() => 'right');
}
