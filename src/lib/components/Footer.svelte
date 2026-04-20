<script lang="ts">
	interface FooterLink {
		label: string;
		href: string;
	}

	interface FooterSection {
		title?: string;
		links: FooterLink[];
	}

	interface Props {
		sections?: FooterSection[];
		copyright?: string;
		additional?: import('svelte').Snippet;
		class?: string;
		onlinkclick?: (event: MouseEvent, href: string) => void;
	}

	let {
		sections = [],
		copyright,
		additional,
		class: className = '',
		onlinkclick
	}: Props = $props();
</script>

<footer class={className}>
	{#if sections.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
			{#each sections as section, i (section.title ?? i)}
				<div>
					{#if section.title}
						<h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
							{section.title}
						</h3>
					{/if}
					<ul class="space-y-3" role="list">
						{#each section.links as link (link.href)}
							<li>
								<a
									href={link.href}
									onclick={(e) => onlinkclick?.(e, link.href)}
									class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/if}

	{#if copyright || additional}
		<div class="flex flex-col md:flex-row justify-between items-center pt-8 pb-8 border-t border-gray-200 dark:border-gray-800 gap-4">
			{#if copyright}
				<p class="text-sm text-gray-600 dark:text-gray-400">
					{@html copyright}
				</p>
			{/if}

			{#if additional}
				<div class="flex items-center gap-6">
					{@render additional()}
				</div>
			{/if}
		</div>
	{/if}
</footer>
