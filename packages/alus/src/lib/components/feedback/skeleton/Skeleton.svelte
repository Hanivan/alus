<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['span'], 'children'> & {
		'aria-label'?: string;
		/** When true (default) acts as live status; set false for purely decorative skeletons */
		announce?: boolean;
	};

	let {
		class: className = '',
		'aria-label': ariaLabel = 'Loading',
		announce = true,
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		announce
			? mergeAttrs(labelAttrs({ label: ariaLabel }), interactiveStateAttrs({ busy: true }))
			: {}
	);
</script>

{#if announce}
	<span {...rest} class={className} role="status" {...ariaAttrs}></span>
{:else}
	<span {...rest} class={className} aria-hidden="true"></span>
{/if}
