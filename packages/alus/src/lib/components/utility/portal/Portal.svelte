<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		target?: HTMLElement | string;
		disabled?: boolean;
	};

	let { children, target, disabled = false, ...rest }: Props = $props();

	let node: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (disabled || !node) return;

		const dest =
			typeof target === 'string' ? document.querySelector(target) : (target ?? document.body);

		if (!dest) return;

		dest.appendChild(node);

		return () => {
			if (node?.parentNode) {
				node.parentNode.removeChild(node);
			}
		};
	});
</script>

{#if disabled}
	{#if children}{@render children()}{/if}
{:else}
	<div {...rest} bind:this={node}>
		{#if children}{@render children()}{/if}
	</div>
{/if}
