<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLLiAttributes, 'children'> {
		children?: import('svelte').Snippet;
		marker?: import('svelte').Snippet;
		time?: string;
		datetime?: string;
		status?: 'completed' | 'current' | 'upcoming';
	}

	let {
		children,
		class: className = '',
		marker,
		time,
		datetime,
		status,
		...rest
	}: Props = $props();
</script>

<li
	{...rest}
	role="listitem"
	class={className}
	data-status={status}
	aria-current={status === 'current' ? 'step' : undefined}
>
	{#if marker}
		<span data-timeline-marker aria-hidden="true">{@render marker()}</span>
	{/if}
	{#if time || datetime}
		<time {datetime}>{time ?? datetime}</time>
	{/if}
	{#if children}{@render children()}{/if}
</li>
