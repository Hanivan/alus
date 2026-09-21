<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { trap } from '$utils/a11y/index.js';
	import { getCommandMenuContext } from './CommandMenu.svelte';
	import Portal from '../../utility/portal/Portal.svelte';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		backdropClass?: string;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		'aria-label'?: string;
	};

	let {
		children,
		class: className = '',
		backdropClass = '',
		closeOnEscape = true,
		closeOnOutsideClick = true,
		'aria-label': ariaLabel = 'Command menu',
		...rest
	}: Props = $props();

	const ctx = getCommandMenuContext();

	const contentRef: Attachment<HTMLDivElement> = (node) => {
		const previouslyFocused = document.activeElement as HTMLElement | null;
		const releaseTrap = trap(node);

		const raf = requestAnimationFrame(() => {
			const input = node.querySelector<HTMLInputElement>(`#${CSS.escape(ctx.inputId)}`);
			input?.focus();
			input?.select?.();
		});

		function onKeydown(e: KeyboardEvent) {
			if (closeOnEscape && e.key === 'Escape') {
				e.preventDefault();
				ctx.setOpen(false);
			}
		}

		function onDocPointerDown(e: PointerEvent) {
			if (!closeOnOutsideClick) return;
			if (!(e.target instanceof Node)) return;
			if (!node.contains(e.target)) ctx.setOpen(false);
		}

		document.addEventListener('keydown', onKeydown);
		document.addEventListener('pointerdown', onDocPointerDown, true);

		return () => {
			cancelAnimationFrame(raf);
			releaseTrap?.();
			document.removeEventListener('keydown', onKeydown);
			document.removeEventListener('pointerdown', onDocPointerDown, true);
			const trigger = ctx.triggerEl.current ?? previouslyFocused;
			trigger?.focus?.();
		};
	};
</script>

{#if ctx.open()}
	<Portal>
		<div data-cmdk-backdrop class={backdropClass}>
			<div
				{...rest}
				role="dialog"
				aria-modal="true"
				aria-label={ariaLabel}
				class={className}
				{@attach contentRef}
			>
				{#if children}{@render children()}{/if}
			</div>
		</div>
	</Portal>
{/if}
