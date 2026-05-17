<script lang="ts">
	import { untrack } from 'svelte';
	import { setTabsContext } from './context.js';
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		value?: string;
		orientation?: 'horizontal' | 'vertical';
		activation?: 'automatic' | 'manual';
		class?: string;
		id?: string;
		onValueChange?: (v: string) => void;
	}

	let {
		children,
		value = $bindable(''),
		orientation = 'horizontal',
		activation = 'automatic',
		class: className = '',
		id,
		onValueChange
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

<div class={className} data-orientation={orientation}>
	{#if children}{@render children()}{/if}
</div>
