<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		marker?: import('svelte').Snippet;
		time?: string;
		datetime?: string;
		status?: 'completed' | 'current' | 'upcoming';
	}

	let { children, class: className = '', marker, time, datetime, status }: Props = $props();
</script>

<li
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
