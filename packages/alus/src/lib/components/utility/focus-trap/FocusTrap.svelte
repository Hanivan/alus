<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { trap, focusFirst } from '$utils/a11y/index.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		active?: boolean;
		autoFocus?: boolean;
		restoreFocus?: boolean;
	};

	let {
		children,
		class: className = '',
		active = true,
		autoFocus = true,
		restoreFocus = true,
		...rest
	}: Props = $props();

	const trapAttach: Attachment<HTMLDivElement> = (node) => {
		if (!active) return;

		const previouslyFocused = document.activeElement as HTMLElement | null;

		if (autoFocus) focusFirst(node);

		const cleanup = trap(node);

		return () => {
			cleanup();
			if (restoreFocus) previouslyFocused?.focus?.();
		};
	};
</script>

<div {...rest} class={className} {@attach trapAttach}>
	{#if children}{@render children()}{/if}
</div>
