<script lang="ts">
	import { getTabsContext } from './context.js';

	interface Props {
		children?: import('svelte').Snippet;
		value: string;
		class?: string;
		forceMount?: boolean;
	}

	let { children, value, class: className = '', forceMount = false }: Props = $props();

	const ctx = getTabsContext();
	let active = $derived(ctx.value() === value);
	let tabId = $derived(`${ctx.baseId}-tab-${value}`);
	let panelId = $derived(`${ctx.baseId}-panel-${value}`);
</script>

{#if active || forceMount}
	<div
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
