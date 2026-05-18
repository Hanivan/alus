<script lang="ts" module>
	export interface LightboxImage {
		src: string;
		alt: string;
		caption?: string;
	}
</script>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { trap } from '$utils/a11y/index.js';
	import { generateCounterId } from '$utils/a11y/id.js';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		images: LightboxImage[];
		index?: number;
		open?: boolean;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		loop?: boolean;
		class?: string;
		backdropClass?: string;
		imageClass?: string;
		style?: string;
		controls?: import('svelte').Snippet<
			[
				{
					prev: () => void;
					next: () => void;
					close: () => void;
					index: number;
					total: number;
					hasPrev: boolean;
					hasNext: boolean;
				}
			]
		>;
		caption?: import('svelte').Snippet<[{ image: LightboxImage; index: number; total: number }]>;
		onOpenChange?: (open: boolean) => void;
		onIndexChange?: (index: number) => void;
	}

	let {
		images,
		index = $bindable(0),
		open = $bindable(false),
		closeOnEscape = true,
		closeOnOutsideClick = true,
		loop = true,
		class: className = '',
		backdropClass = '',
		imageClass = '',
		style,
		controls,
		caption,
		onOpenChange,
		onIndexChange
	}: Props = $props();

	const titleId = generateCounterId('lightbox-title');
	const total = $derived(images.length);
	const current = $derived(images[index] as LightboxImage | undefined);
	const hasPrev = $derived(loop || index > 0);
	const hasNext = $derived(loop || index < total - 1);

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	function go(to: number) {
		if (total === 0) return;
		const next = loop ? (to + total) % total : Math.max(0, Math.min(total - 1, to));
		index = next;
		onIndexChange?.(next);
	}

	function prev() {
		go(index - 1);
	}
	function next() {
		go(index + 1);
	}
	function close() {
		setOpen(false);
	}

	const ref: Attachment<HTMLDivElement> = (node) => {
		const release = trap(node);
		function onKey(e: KeyboardEvent) {
			if (closeOnEscape && e.key === 'Escape') {
				e.preventDefault();
				close();
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				prev();
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				next();
			}
		}
		document.addEventListener('keydown', onKey);
		return () => {
			release();
			document.removeEventListener('keydown', onKey);
		};
	};

	function onBackdrop(e: MouseEvent) {
		if (!closeOnOutsideClick) return;
		if (e.target === e.currentTarget) close();
	}
</script>

{#if open && current}
	<Portal>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class={backdropClass} data-lightbox-backdrop onclick={onBackdrop}>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabindex="-1"
				class={className}
				{style}
				{@attach ref}
			>
				<figure>
					<img src={current.src} alt={current.alt} class={imageClass} />
					{#if caption}
						<figcaption id={titleId}>
							{@render caption({ image: current, index, total })}
						</figcaption>
					{:else if current.caption}
						<figcaption id={titleId}>{current.caption}</figcaption>
					{:else}
						<figcaption id={titleId} hidden>{current.alt}</figcaption>
					{/if}
				</figure>
				{#if controls}
					{@render controls({ prev, next, close, index, total, hasPrev, hasNext })}
				{/if}
			</div>
		</div>
	</Portal>
{/if}
