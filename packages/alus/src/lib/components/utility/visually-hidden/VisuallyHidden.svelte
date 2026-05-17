<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		as?: 'span' | 'div';
	}

	let { children, as = 'span' }: Props = $props();

	const hiddenStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
</script>

{#if as === 'div'}
	<div style={hiddenStyle}>
		{#if children}{@render children()}{/if}
	</div>
{:else}
	<span style={hiddenStyle}>
		{#if children}{@render children()}{/if}
	</span>
{/if}
