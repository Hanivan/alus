<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getTabsContext } from './context.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		// Not a DOM attribute: pairs the panel with its Tab.
		value: string;
		// Read by the `{#if active || forceMount}` markup — rule 3.
		forceMount?: boolean;
	};

	let { children, value, class: className = '', forceMount = false, ...rest }: Props = $props();

	const ctx = getTabsContext();
	let active = $derived(ctx.value() === value);
	let tabId = $derived(`${ctx.baseId}-tab-${value}`);
	let panelId = $derived(`${ctx.baseId}-panel-${value}`);
</script>

{#if active || forceMount}
	<div
		{...rest}
		id={panelId}
		role="tabpanel"
		aria-labelledby={tabId}
		tabindex="0"
		hidden={!active}
		data-state={active ? 'active' : 'inactive'}
		class={className}
	>
		{#if children}{@render children()}{/if}
	</div>
{/if}
