<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { AriaLive } from '$types/index.js';

	type Props = Omit<SvelteHTMLElements['p'], 'children'> & {
		children?: import('svelte').Snippet;
		message?: string;
		live?: AriaLive;
		atomic?: boolean;
	};

	let {
		children,
		message,
		class: className = '',
		live = 'polite',
		atomic = true,
		...rest
	}: Props = $props();

	let hasContent = $derived(!!message || !!children);
</script>

{#if hasContent}
	<p
		{...rest}
		role="alert"
		class={className}
		aria-live={live}
		aria-atomic={atomic ? 'true' : 'false'}
	>
		{#if children}{@render children()}{:else}{message}{/if}
	</p>
{/if}
