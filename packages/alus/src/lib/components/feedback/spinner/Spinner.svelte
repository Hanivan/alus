<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import VisuallyHidden from '../../utility/visually-hidden/VisuallyHidden.svelte';

	type Props = Omit<SvelteHTMLElements['span'], 'children'> & {
		label?: string;
	};

	let { class: className = '', label = 'Loading', ...rest }: Props = $props();
</script>

<span {...rest} role="status" aria-live="polite" class={className}>
	<VisuallyHidden>{label}</VisuallyHidden>
</span>
