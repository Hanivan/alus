<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		class?: string;
		'aria-label'?: string;
		/** When true (default) acts as live status; set false for purely decorative skeletons */
		announce?: boolean;
	}

	let {
		class: className = '',
		'aria-label': ariaLabel = 'Loading',
		announce = true
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		announce
			? mergeAttrs(labelAttrs({ label: ariaLabel }), interactiveStateAttrs({ busy: true }))
			: {}
	);
</script>

{#if announce}
	<span class={className} role="status" {...ariaAttrs}></span>
{:else}
	<span class={className} aria-hidden="true"></span>
{/if}
