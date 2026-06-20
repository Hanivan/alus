<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getMenuContext, type MenuItemEntry } from './Menu.svelte';
	import { interactiveStateAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ highlighted: boolean }]>;
		class?: string;
		disabled?: boolean;
		onSelect?: () => void;
		role?: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';
		checked?: boolean;
	}

	let {
		children,
		class: className = '',
		disabled = false,
		onSelect,
		role = 'menuitem',
		checked
	}: Props = $props();

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

	const ariaAttrs = $derived(
		interactiveStateAttrs({
			disabled,
			checked: role === 'menuitemcheckbox' || role === 'menuitemradio' ? checked : undefined
		})
	);
</script>

<div
	{role}
	tabindex="-1"
	data-highlighted={highlighted || undefined}
	data-disabled={disabled || undefined}
	class={className}
	onclick={activate}
	onpointerenter={onPointerEnter}
	onkeydown={onKeydown}
	{...ariaAttrs}
	{@attach itemRef}
>
	{#if children}{@render children({ highlighted })}{/if}
</div>
