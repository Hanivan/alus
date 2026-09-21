<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	// 'placeholder' is omitted as well as 'children': the component declares
	// `placeholder?: Snippet` while `HTMLAttributes.placeholder` is `string`, so the
	// intersection is `never` — a consumer's snippet could never be passed, silently.
	interface Props extends Omit<HTMLImgAttributes, 'children' | 'placeholder'> {
		src: string;
		alt: string;
		decorative?: boolean;
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
		decorative = false,
		fallback,
		placeholder,
		onLoad,
		onError,
		...rest
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
		{...rest}
		{src}
		alt={decorative ? '' : alt}
		aria-hidden={decorative || undefined}
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
