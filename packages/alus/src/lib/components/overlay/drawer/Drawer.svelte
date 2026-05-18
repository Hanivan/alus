<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import { setDrawerSide, type DrawerSide } from './context.js';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		side?: DrawerSide;
		modal?: boolean;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		open = $bindable(false),
		side = 'right',
		modal = true,
		onOpenChange
	}: Props = $props();

	setDrawerSide(() => side);
</script>

<Modal bind:open {modal} role="dialog" {onOpenChange}>
	{#if children}{@render children()}{/if}
</Modal>
