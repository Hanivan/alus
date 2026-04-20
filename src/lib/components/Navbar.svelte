<script lang="ts">
	interface NavItem {
		label: string;
		href: string;
		ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
	}

	interface Props {
		links?: NavItem[];
		brand?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		'aria-label'?: string;
		class?: string;
		onlinkclick?: (event: MouseEvent, href: string) => void;
	}

	let {
		links = [],
		brand,
		actions,
		'aria-label': ariaLabel = 'Main navigation',
		class: className = '',
		onlinkclick
	}: Props = $props();
</script>

<nav aria-label={ariaLabel} class={className}>
	{#if brand}
		<div class="flex items-center">
			{@render brand()}
		</div>
	{/if}

	{#if links.length > 0}
		<ul class="flex items-center gap-4" role="list">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						aria-current={link.ariaCurrent}
						onclick={(e) => onlinkclick?.(e, link.href)}
						class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	{#if actions}
		<div class="flex items-center gap-4">
			{@render actions()}
		</div>
	{/if}
</nav>
