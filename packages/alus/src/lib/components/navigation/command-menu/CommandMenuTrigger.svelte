<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getCommandMenuContext } from './CommandMenu.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
	}

	let { children, class: className = '', 'aria-label': ariaLabel = 'Open command menu' }: Props =
		$props();

	const ctx = getCommandMenuContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};
</script>

<button
	type="button"
	class={className}
	aria-haspopup="dialog"
	aria-expanded={ctx.open()}
	aria-label={ariaLabel}
	onclick={() => ctx.setOpen(!ctx.open())}
	{@attach triggerRef}
>
	{#if children}{@render children()}{/if}
</button>
