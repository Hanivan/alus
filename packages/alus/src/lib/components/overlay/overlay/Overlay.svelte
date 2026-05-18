<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		portal?: boolean;
		class?: string;
		style?: string;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		open = $bindable(false),
		closeOnEscape = true,
		closeOnOutsideClick = true,
		portal = true,
		class: className = '',
		style,
		onOpenChange
	}: Props = $props();

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	const overlayRef: Attachment<HTMLDivElement> = () => {
		function onKeydown(e: KeyboardEvent) {
			if (closeOnEscape && e.key === 'Escape') {
				e.preventDefault();
				setOpen(false);
			}
		}
		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener('keydown', onKeydown);
	};

	function onBackdropClick(e: MouseEvent) {
		if (!closeOnOutsideClick) return;
		if (e.target === e.currentTarget) setOpen(false);
	}
</script>

{#snippet inner()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class={className}
		{style}
		data-overlay
		onclick={onBackdropClick}
		{@attach overlayRef}
	>
		{#if children}{@render children()}{/if}
	</div>
{/snippet}

{#if open}
	{#if portal}
		<Portal>{@render inner()}</Portal>
	{:else}
		{@render inner()}
	{/if}
{/if}
