<script lang="ts">
	import Modal from '$components/overlay/modal/Modal.svelte';
	import ModalContent from '$components/overlay/modal/ModalContent.svelte';

	let { open = true }: { open?: boolean } = $props();
</script>

<Modal {open}>
	<!-- `role` is passed deliberately and must LOSE to ModalContent's own role="dialog",
	     because `{...rest}` is spread first. Without a consumer value here the assertion in
	     the spec is inert — it would hold before and after the fix. Verified 2026-09-21. -->
	<ModalContent data-testid="modal-content" role="alertdialog">content</ModalContent>
</Modal>
