<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	interface Props {
		children?: import('svelte').Snippet;
		sentinel?: import('svelte').Snippet<[{ loading: boolean; done: boolean }]>;
		loading?: boolean;
		hasMore?: boolean;
		rootMargin?: string;
		threshold?: number;
		disabled?: boolean;
		class?: string;
		style?: string;
		onLoad?: () => void | Promise<void>;
	}

	let {
		children,
		sentinel,
		loading = $bindable(false),
		hasMore = true,
		rootMargin = '200px',
		threshold = 0,
		disabled = false,
		class: className = '',
		style,
		onLoad
	}: Props = $props();

	const sentinelRef: Attachment<HTMLDivElement> = (node) => {
		if (disabled || typeof IntersectionObserver === 'undefined') return;

		const obs = new IntersectionObserver(
			async (entries) => {
				const entry = entries[0];
				if (!entry?.isIntersecting) return;
				if (loading || !hasMore) return;
				loading = true;
				try {
					await onLoad?.();
				} finally {
					loading = false;
				}
			},
			{ rootMargin, threshold }
		);

		obs.observe(node);
		return () => obs.disconnect();
	};
</script>

<div class={className} {style}>
	{#if children}{@render children()}{/if}
	<div data-infinite-sentinel aria-hidden="true" {@attach sentinelRef}>
		{#if sentinel}{@render sentinel({ loading, done: !hasMore })}{/if}
	</div>
</div>
