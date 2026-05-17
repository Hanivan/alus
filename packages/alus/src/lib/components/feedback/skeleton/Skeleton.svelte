<script lang="ts">
	interface Props {
		class?: string;
		'aria-label'?: string;
	}

	let { class: className = '', 'aria-label': ariaLabel = 'Loading' }: Props = $props();
</script>

<span class={className} aria-hidden="true" aria-label={ariaLabel}></span>
