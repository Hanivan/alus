<script lang="ts">
	import type { AriaLive } from '$types/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		message?: string;
		id?: string;
		class?: string;
		live?: AriaLive;
		atomic?: boolean;
	}

	let {
		children,
		message,
		id,
		class: className = '',
		live = 'polite',
		atomic = true
	}: Props = $props();

	let hasContent = $derived(!!message || !!children);
</script>

{#if hasContent}
	<p {id} role="alert" class={className} aria-live={live} aria-atomic={atomic ? 'true' : 'false'}>
		{#if children}{@render children()}{:else}{message}{/if}
	</p>
{/if}
