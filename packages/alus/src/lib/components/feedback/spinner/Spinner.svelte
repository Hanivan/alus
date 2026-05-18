<script lang="ts">
	import VisuallyHidden from '../../utility/visually-hidden/VisuallyHidden.svelte';

	interface Props {
		class?: string;
		label?: string;
	}

	let { class: className = '', label = 'Loading' }: Props = $props();
</script>

<span role="status" aria-live="polite" class={className}>
	<VisuallyHidden>{label}</VisuallyHidden>
</span>
