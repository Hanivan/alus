<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { trap, focusFirst } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		active?: boolean;
		autoFocus?: boolean;
		restoreFocus?: boolean;
	}

	let {
		children,
		class: className = '',
		active = true,
		autoFocus = true,
		restoreFocus = true
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

<div class={className} {@attach trapAttach}>
	{#if children}{@render children()}{/if}
</div>
