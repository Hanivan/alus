<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { trap, focusFirst } from '$utils/a11y/index.js';
	import { getModalContext } from './Modal.svelte';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		backdropClass?: string;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		trapFocus?: boolean;
		restoreFocus?: boolean;
		autoFocus?: boolean;
	}

	let {
		children,
		class: className = '',
		backdropClass = '',
		closeOnEscape = true,
		closeOnOutsideClick = true,
		trapFocus = true,
		restoreFocus = true,
		autoFocus = true
	}: Props = $props();

	const ctx = getModalContext();

	const contentRef: Attachment<HTMLDivElement> = (node) => {
		const previouslyFocused = document.activeElement as HTMLElement | null;
		let releaseTrap: (() => void) | undefined;

		if (trapFocus) releaseTrap = trap(node);
		if (autoFocus) focusFirst(node);

		function onKeydown(e: KeyboardEvent) {
			if (closeOnEscape && e.key === 'Escape') {
				e.preventDefault();
				ctx.setOpen(false);
			}
		}

		document.addEventListener('keydown', onKeydown);

		return () => {
			releaseTrap?.();
			document.removeEventListener('keydown', onKeydown);
			if (restoreFocus) {
				const trigger = ctx.triggerEl.current ?? previouslyFocused;
				trigger?.focus?.();
			}
		};
	};

	function onBackdropClick(e: MouseEvent) {
		if (!closeOnOutsideClick) return;
		if (e.target === e.currentTarget) ctx.setOpen(false);
	}
</script>

{#if ctx.open()}
	<Portal>
		{#if ctx.modal()}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div data-modal-backdrop class={backdropClass} onclick={onBackdropClick}>
				<div
					id={ctx.contentId}
					role={ctx.role()}
					aria-modal="true"
					aria-labelledby={ctx.hasTitle() ? ctx.titleId : undefined}
					aria-describedby={ctx.hasDescription() ? ctx.descriptionId : undefined}
					tabindex="-1"
					class={className}
					{@attach contentRef}
				>
					{#if children}{@render children()}{/if}
				</div>
			</div>
		{:else}
			<div
				id={ctx.contentId}
				role={ctx.role()}
				aria-labelledby={ctx.hasTitle() ? ctx.titleId : undefined}
				aria-describedby={ctx.hasDescription() ? ctx.descriptionId : undefined}
				tabindex="-1"
				class={className}
				{@attach contentRef}
			>
				{#if children}{@render children()}{/if}
			</div>
		{/if}
	</Portal>
{/if}
