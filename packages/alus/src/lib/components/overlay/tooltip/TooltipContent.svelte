<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom';
	import { getTooltipContext } from './Tooltip.svelte';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		placement?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-start'
			| 'top-end'
			| 'bottom-start'
			| 'bottom-end'
			| 'left-start'
			| 'left-end'
			| 'right-start'
			| 'right-end';
		offset?: number;
		interactive?: boolean;
	}

	let {
		children,
		class: className = '',
		placement = 'top',
		offset: offsetPx = 6,
		interactive = false
	}: Props = $props();

	const ctx = getTooltipContext();

	const contentRef: Attachment<HTMLDivElement> = (node) => {
		const trigger = ctx.triggerEl.current;
		if (!trigger) return;

		const cleanup = autoUpdate(trigger, node, async () => {
			const { x, y } = await computePosition(trigger, node, {
				placement,
				strategy: 'fixed',
				middleware: [offset(offsetPx), flip(), shift({ padding: 8 })]
			});
			Object.assign(node.style, { left: `${x}px`, top: `${y}px` });
		});

		return cleanup;
	};
</script>

{#if ctx.open()}
	<Portal>
		<div
			id={ctx.contentId}
			role="tooltip"
			class={className}
			style="position:fixed; top:0; left:0;{interactive ? '' : ' pointer-events:none;'}"
			onpointerenter={interactive ? ctx.cancel : undefined}
			onpointerleave={interactive ? ctx.scheduleClose : undefined}
			{@attach contentRef}
		>
			{#if children}{@render children()}{/if}
		</div>
	</Portal>
{/if}
