<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		class?: string;
		src?: string;
		alt?: string;
		fallback?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		// Accessibility attributes
		'aria-label'?: string;
	}

	let {
		class: className = '',
		src,
		alt = '',
		fallback,
		size = 'md',
		'aria-label': ariaLabel
	}: Props = $props();

	let imgError = $state(false);

	// Build ARIA attributes using reusable utilities
	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel || alt })
		)
	);

	function getInitials(text: string): string {
		return text
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
</script>

<div
	class={className}
	data-size={size}
	{...ariaAttrs}
>
	{#if src && !imgError}
		<img
			{src}
			{alt}
			aria-hidden="true"
			onerror={() => imgError = true}
			class="avatar-image"
		/>
	{:else if fallback}
		<span class="avatar-fallback" aria-hidden="true">
			{getInitials(fallback)}
		</span>
	{:else}
		<span class="avatar-placeholder" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
			</svg>
		</span>
	{/if}
</div>