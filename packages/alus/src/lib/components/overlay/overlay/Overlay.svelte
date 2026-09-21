<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { useEventListener } from 'runed';
	import Portal from '../../utility/portal/Portal.svelte';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		open?: boolean;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		portal?: boolean;
		style?: string;
		onOpenChange?: (open: boolean) => void;
	};

	let {
		children,
		open = $bindable(false),
		closeOnEscape = true,
		closeOnOutsideClick = true,
		portal = true,
		class: className = '',
		style,
		onOpenChange,
		...rest
	}: Props = $props();

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	useEventListener(
		() => (open ? document : null),
		'keydown',
		(e) => {
			if (closeOnEscape && e.key === 'Escape') {
				e.preventDefault();
				setOpen(false);
			}
		}
	);

	function onBackdropClick(e: MouseEvent) {
		if (!closeOnOutsideClick) return;
		if (e.target === e.currentTarget) setOpen(false);
	}
</script>

{#snippet inner()}
	<div {...rest} class={className} {style} data-overlay onclick={onBackdropClick}>
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
