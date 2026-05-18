<script lang="ts">
	import Modal from '../modal/Modal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		modal?: boolean;
		role?: 'dialog' | 'alertdialog';
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		open = $bindable(false),
		modal = false,
		role = 'dialog',
		onOpenChange
	}: Props = $props();
</script>

<Modal bind:open {modal} {role} {onOpenChange}>
	{#if children}{@render children()}{/if}
</Modal>
