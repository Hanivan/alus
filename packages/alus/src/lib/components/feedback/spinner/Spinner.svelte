<script lang="ts">
	interface Props {
		class?: string;
		label?: string;
	}

	let { class: className = '', label = 'Loading' }: Props = $props();
</script>

<span role="status" aria-live="polite" class={className}>
	<span class="sr-only">{label}</span>
</span>
