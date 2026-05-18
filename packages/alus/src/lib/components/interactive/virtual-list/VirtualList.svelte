<script lang="ts" generics="T">
	import type { Attachment } from 'svelte/attachments';

	interface Props {
		items: T[];
		itemHeight: number;
		overscan?: number;
		class?: string;
		innerClass?: string;
		itemClass?: string;
		style?: string;
		'aria-label'?: string;
		item: import('svelte').Snippet<[{ item: T; index: number; style: string }]>;
	}

	let {
		items,
		itemHeight,
		overscan = 4,
		class: className = '',
		innerClass = '',
		itemClass = '',
		style,
		'aria-label': ariaLabel,
		item
	}: Props = $props();

	let scrollTop = $state(0);
	let viewportHeight = $state(0);

	const totalHeight = $derived(items.length * itemHeight);

	const range = $derived.by(() => {
		if (!viewportHeight || itemHeight <= 0) return { start: 0, end: Math.min(items.length, 20) };
		const visible = Math.ceil(viewportHeight / itemHeight);
		const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
		const end = Math.min(items.length, start + visible + overscan * 2);
		return { start, end };
	});

	const slice = $derived(items.slice(range.start, range.end));

	const containerRef: Attachment<HTMLDivElement> = (node) => {
		const onScroll = () => {
			scrollTop = node.scrollTop;
		};
		const ro = new ResizeObserver(() => {
			viewportHeight = node.clientHeight;
		});
		viewportHeight = node.clientHeight;
		node.addEventListener('scroll', onScroll, { passive: true });
		ro.observe(node);
		return () => {
			node.removeEventListener('scroll', onScroll);
			ro.disconnect();
		};
	};

	function rowStyle(i: number) {
		return `position:absolute; top:${(range.start + i) * itemHeight}px; left:0; right:0; height:${itemHeight}px;`;
	}
</script>

<div
	class={className}
	style={`overflow:auto; position:relative; ${style ?? ''}`}
	role="list"
	aria-label={ariaLabel}
	{@attach containerRef}
>
	<div class={innerClass} style={`position:relative; height:${totalHeight}px;`}>
		{#each slice as it, i (range.start + i)}
			<div
				role="listitem"
				aria-setsize={items.length}
				aria-posinset={range.start + i + 1}
				class={itemClass}
				style={rowStyle(i)}
			>
				{@render item({ item: it, index: range.start + i, style: rowStyle(i) })}
			</div>
		{/each}
	</div>
</div>
