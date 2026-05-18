<script lang="ts">
	import { getTabsContext, TAB_LIST_ATTR, TAB_ATTR } from './context.js';
	import { interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ selected: boolean }]>;
		value: string;
		disabled?: boolean;
		class?: string;
	}

	let { children, value, disabled = false, class: className = '' }: Props = $props();

	const ctx = getTabsContext();

	let selected = $derived(ctx.value() === value);
	let tabId = $derived(`${ctx.baseId}-tab-${value}`);
	let panelId = $derived(`${ctx.baseId}-panel-${value}`);

	function activate() {
		if (disabled) return;
		ctx.setValue(value);
	}

	function queryTriggers(target: HTMLElement): HTMLElement[] {
		const list = target.closest(`[${TAB_LIST_ATTR}="${ctx.baseId}"]`);
		if (!list) return [];
		return Array.from(list.querySelectorAll<HTMLElement>(`[${TAB_ATTR}]:not([disabled])`));
	}

	function onKeydown(e: KeyboardEvent) {
		const horiz = ctx.orientation() === 'horizontal';
		const nextKey = horiz ? 'ArrowRight' : 'ArrowDown';
		const prevKey = horiz ? 'ArrowLeft' : 'ArrowUp';
		const handled = [nextKey, prevKey, 'Home', 'End', 'Enter', ' '];
		if (!handled.includes(e.key)) return;

		const target = e.currentTarget as HTMLElement;

		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			activate();
			return;
		}

		const triggers = queryTriggers(target);
		if (!triggers.length) return;
		const idx = triggers.indexOf(target);
		let nextEl: HTMLElement | undefined;

		if (e.key === nextKey) nextEl = triggers[(idx + 1) % triggers.length];
		else if (e.key === prevKey) nextEl = triggers[(idx - 1 + triggers.length) % triggers.length];
		else if (e.key === 'Home') nextEl = triggers[0];
		else if (e.key === 'End') nextEl = triggers[triggers.length - 1];

		if (!nextEl) return;
		e.preventDefault();
		nextEl.focus();
		if (ctx.activation() === 'automatic') {
			const nextValue = nextEl.getAttribute(TAB_ATTR);
			if (nextValue) ctx.setValue(nextValue);
		}
	}

	let tabAttr: Record<string, string> = $derived({ [TAB_ATTR]: value });

	const ariaAttrs = $derived(
		mergeAttrs(
			interactiveStateAttrs({ selected, disabled }),
			widgetAttrs({ controls: panelId })
		)
	);
</script>

<button
	id={tabId}
	type="button"
	role="tab"
	tabindex={selected ? 0 : -1}
	data-state={selected ? 'active' : 'inactive'}
	data-disabled={disabled || undefined}
	{disabled}
	class={className}
	onclick={activate}
	onkeydown={onKeydown}
	{...ariaAttrs}
	{...tabAttr}
>
	{#if children}{@render children({ selected })}{/if}
</button>
