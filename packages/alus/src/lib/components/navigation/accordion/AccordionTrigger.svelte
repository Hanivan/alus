<script lang="ts">
	import { getAccordionRoot, getAccordionItem } from './context.js';

	interface Props {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();

	const root = getAccordionRoot();
	const item = getAccordionItem();

	let open = $derived(item.open());
	let disabled = $derived(item.disabled());

	function activate() {
		if (disabled) return;
		root.toggle(item.value);
	}

	function focusSibling(offset: number) {
		const triggers = Array.from(
			document.querySelectorAll<HTMLButtonElement>(
				`[data-accordion-root="${root.baseId}"] [data-accordion-trigger="true"]:not([disabled])`
			)
		);
		const idx = triggers.findIndex((b) => b.id === item.triggerId);
		if (idx < 0 || !triggers.length) return;
		const next = (idx + offset + triggers.length) % triggers.length;
		triggers[next]?.focus();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			focusSibling(1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			focusSibling(-1);
		} else if (e.key === 'Home') {
			e.preventDefault();
			const first = document.querySelector<HTMLButtonElement>(
				`[data-accordion-root="${root.baseId}"] [data-accordion-trigger="true"]:not([disabled])`
			);
			first?.focus();
		} else if (e.key === 'End') {
			e.preventDefault();
			const triggers = document.querySelectorAll<HTMLButtonElement>(
				`[data-accordion-root="${root.baseId}"] [data-accordion-trigger="true"]:not([disabled])`
			);
			triggers[triggers.length - 1]?.focus();
		}
	}
</script>

<button
	id={item.triggerId}
	type="button"
	aria-expanded={open}
	aria-controls={item.contentId}
	data-state={open ? 'open' : 'closed'}
	data-disabled={disabled || undefined}
	data-accordion-trigger="true"
	{disabled}
	class={className}
	onclick={activate}
	onkeydown={onKeydown}
>
	{#if children}{@render children({ open })}{/if}
</button>
