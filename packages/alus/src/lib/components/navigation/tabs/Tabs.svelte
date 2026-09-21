<script lang="ts">
	import { untrack } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { setTabsContext } from './context.js';
	import { generateCounterId } from '$utils/a11y/id.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		value?: string;
		// Read by `setTabsContext` — rule 2.
		orientation?: 'horizontal' | 'vertical';
		activation?: 'automatic' | 'manual';
		// Read once (under `untrack`) to seed `baseId` — rule 2.
		id?: string;
		onValueChange?: (v: string) => void;
	};

	let {
		children,
		value = $bindable(''),
		orientation = 'horizontal',
		activation = 'automatic',
		class: className = '',
		id,
		onValueChange,
		...rest
	}: Props = $props();

	const baseId = untrack(() => id ?? generateCounterId('tabs'));

	setTabsContext({
		value: () => value,
		setValue: (v: string) => {
			value = v;
			onValueChange?.(v);
		},
		orientation: () => orientation,
		activation: () => activation,
		baseId
	});
</script>

<div {...rest} class={className} data-orientation={orientation}>
	{#if children}{@render children()}{/if}
</div>
