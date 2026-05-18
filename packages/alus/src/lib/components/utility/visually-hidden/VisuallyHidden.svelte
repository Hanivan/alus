<script lang="ts">
	import type { AriaLive, AriaRelevant } from '$types/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		as?: 'span' | 'div';
		role?: string;
		'aria-live'?: AriaLive;
		'aria-atomic'?: boolean | 'true' | 'false';
		'aria-relevant'?: AriaRelevant;
		'aria-label'?: string;
	}

	let {
		children,
		as = 'span',
		role,
		'aria-live': ariaLive,
		'aria-atomic': ariaAtomic,
		'aria-relevant': ariaRelevant,
		'aria-label': ariaLabel
	}: Props = $props();

	const hiddenStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
</script>

{#if as === 'div'}
	<div
		style={hiddenStyle}
		{role}
		aria-live={ariaLive}
		aria-atomic={ariaAtomic}
		aria-relevant={ariaRelevant}
		aria-label={ariaLabel}
	>
		{#if children}{@render children()}{/if}
	</div>
{:else}
	<span
		style={hiddenStyle}
		{role}
		aria-live={ariaLive}
		aria-atomic={ariaAtomic}
		aria-relevant={ariaRelevant}
		aria-label={ariaLabel}
	>
		{#if children}{@render children()}{/if}
	</span>
{/if}
