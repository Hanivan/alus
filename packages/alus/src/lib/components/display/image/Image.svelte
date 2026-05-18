<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		decoding?: 'auto' | 'async' | 'sync';
		width?: number | string;
		height?: number | string;
		fallback?: import('svelte').Snippet;
		placeholder?: import('svelte').Snippet;
		onLoad?: () => void;
		onError?: () => void;
	}

	let {
		src,
		alt,
		class: className = '',
		loading = 'lazy',
		decoding = 'async',
		width,
		height,
		fallback,
		placeholder,
		onLoad,
		onError
	}: Props = $props();

	let status = $state<'loading' | 'loaded' | 'error'>('loading');

	function handleLoad() {
		status = 'loaded';
		onLoad?.();
	}

	function handleError() {
		status = 'error';
		onError?.();
	}
</script>

{#if status === 'error' && fallback}
	{@render fallback()}
{:else}
	{#if status === 'loading' && placeholder}
		{@render placeholder()}
	{/if}
	<img
		{src}
		{alt}
		{loading}
		{decoding}
		{width}
		{height}
		class={className}
		data-status={status}
		hidden={status === 'loading' && !!placeholder}
		onload={handleLoad}
		onerror={handleError}
	/>
{/if}
