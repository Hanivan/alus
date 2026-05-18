<script lang="ts">
	import { getCommandMenuContext } from './CommandMenu.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
	}

	let { children, class: className = '', 'aria-label': ariaLabel = 'Commands' }: Props = $props();
	const ctx = getCommandMenuContext();
</script>

<div
	role="listbox"
	id={ctx.listId}
	aria-label={ariaLabel}
	class={className}
>
	{#if children}{@render children()}{/if}
</div>
