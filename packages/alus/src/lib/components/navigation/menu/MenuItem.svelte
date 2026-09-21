<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getMenuContext, type MenuItemEntry } from './Menu.svelte';
	import { interactiveStateAttrs } from '$utils/a11y/index.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet<[{ highlighted: boolean }]>;
		// Read inside `onPointerEnter`/`activate` and registered with the context — rule 2.
		disabled?: boolean;
		// Not a native attribute: the component's own selection callback.
		onSelect?: () => void;
		// Kept: the explicit `{role}` attribute this file already emits, and the `ariaAttrs`
		// derivation reads `role`. The union is a subset of `AriaRole` (which ends in
		// `(string & {})`), so the inherited declaration cannot collapse it.
		role?: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';
		// Read by the `ariaAttrs` derivation — rule 2.
		checked?: boolean;
	};

	let {
		children,
		class: className = '',
		disabled = false,
		onSelect,
		role = 'menuitem',
		checked,
		...rest
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
	{...rest}
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
