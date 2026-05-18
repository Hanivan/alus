<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		ratio?: number;
		class?: string;
		innerClass?: string;
	}

	let { children, ratio = 1, class: className = '', innerClass = '' }: Props = $props();

	const containerStyle = $derived(`aspect-ratio:${ratio};`);
</script>

<div class={className} style={containerStyle} data-aspect-ratio={ratio}>
	<div class={innerClass} style="width:100%;height:100%;">
		{#if children}{@render children()}{/if}
	</div>
</div>
