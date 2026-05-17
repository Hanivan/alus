<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getMenuContext, type MenuItemEntry } from './Menu.svelte';

	interface Props {
		children?: import('svelte').Snippet<[{ highlighted: boolean }]>;
		class?: string;
		disabled?: boolean;
		onSelect?: () => void;
	}

	let { children, class: className = '', disabled = false, onSelect }: Props = $props();

	const ctx = getMenuContext();

	let el: HTMLDivElement | null = $state(null);
	let entry: MenuItemEntry | null = null;

	const itemRef: Attachment<HTMLDivElement> = (node) => {
		el = node;
		entry = { el: node, disabled, onSelect };
		const unregister = ctx.registerItem(entry);
		return () => {
			unregister();
			el = null;
			entry = null;
		};
	};

	let highlighted = $derived(ctx.highlighted() === el);

	function activate() {
		if (!entry) return;
		ctx.activate(entry);
	}

	function onPointerEnter() {
		if (disabled || !el) return;
		ctx.setHighlighted(el);
		el.focus();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			activate();
		}
	}
</script>

<div
	role="menuitem"
	tabindex="-1"
	aria-disabled={disabled || undefined}
	data-highlighted={highlighted || undefined}
	data-disabled={disabled || undefined}
	class={className}
	onclick={activate}
	onpointerenter={onPointerEnter}
	onkeydown={onKeydown}
	{@attach itemRef}
>
	{#if children}{@render children({ highlighted })}{/if}
</div>
