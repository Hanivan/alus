<script lang="ts">
	import { CaretRight } from 'phosphor-svelte';

	let hoverCard = $state<string | null>(null);

	interface ComponentCard {
		title: string;
		description: string;
		href: string;
		kanji: string;
	}

	const components: ComponentCard[] = [
		{
			title: 'Button',
			description: 'Accessible button with ARIA support and toggle states',
			href: '/components/button',
			kanji: 'ボタン'
		},
		{
			title: 'Input',
			description: 'Text input with validation, error states, and accessibility',
			href: '/components/input',
			kanji: '入力'
		},
		{
			title: 'Checkbox',
			description: 'Checkbox with indeterminate state and proper ARIA support',
			href: '/components/checkbox',
			kanji: 'チェック'
		},
		{
			title: 'Radio',
			description: 'Radio button with keyboard navigation and accessibility',
			href: '/components/radio',
			kanji: '選択'
		},
		{
			title: 'Badge',
			description: 'Status indicator with ARIA live regions and variant support',
			href: '/components/badge',
			kanji: '章'
		},
		{
			title: 'Tag',
			description: 'Removable tag with dismiss button and keyboard support',
			href: '/components/tag',
			kanji: '標'
		},
		{
			title: 'Divider',
			description: 'Visual separator with horizontal and vertical orientations',
			href: '/components/divider',
			kanji: '線'
		},
		{
			title: 'Avatar',
			description: 'User avatar with image fallback to initials or placeholder',
			href: '/components/avatar',
			kanji: '顔'
		},
		{
			title: 'VisuallyHidden',
			description: 'Screen-reader only content, visually hidden but accessible',
			href: '/components/visually-hidden',
			kanji: '隠'
		},
		{
			title: 'Portal',
			description: 'Teleport content to document.body or any target element',
			href: '/components/portal',
			kanji: '門'
		},
		{
			title: 'FocusTrap',
			description: 'Trap keyboard focus within a container for modals and dialogs',
			href: '/components/focus-trap',
			kanji: '罠'
		},
		{
			title: 'Textarea',
			description: 'Multi-line text input with validation and accessibility',
			href: '/components/textarea',
			kanji: '文'
		},
		{
			title: 'Select',
			description: 'Native dropdown select with single/multiple selection',
			href: '/components/select',
			kanji: '択'
		},
		{
			title: 'Fieldset',
			description: 'Group related form fields with legend and accessibility',
			href: '/components/fieldset',
			kanji: '組'
		},
		{
			title: 'RadioGroup',
			description: 'Radio button group with shared name context and orientation',
			href: '/components/radio-group',
			kanji: '群'
		},
		{
			title: 'Form',
			description: 'Form wrapper with submit handling and ARIA labels',
			href: '/components/form',
			kanji: '式'
		},
		{
			title: 'Label',
			description: 'Form label with for-association and required indicator',
			href: '/components/label',
			kanji: '札'
		},
		{
			title: 'Switch',
			description: 'Toggle switch with role=switch and keyboard support',
			href: '/components/switch',
			kanji: '切'
		},
		{
			title: 'Spinner',
			description: 'Loading spinner with ARIA live region',
			href: '/components/spinner',
			kanji: '回'
		},
		{
			title: 'Skeleton',
			description: 'Loading placeholder for content blocks',
			href: '/components/skeleton',
			kanji: '骨'
		},
		{
			title: 'Progress',
			description: 'Progress bar with value/indeterminate states',
			href: '/components/progress',
			kanji: '進'
		},
		{
			title: 'Alert',
			description: 'Notification banner with variants and dismiss',
			href: '/components/alert',
			kanji: '報'
		},
		{
			title: 'Slider',
			description: 'Range slider with min/max/step and accessible keyboard control',
			href: '/components/slider',
			kanji: '滑'
		},
		{
			title: 'FileInput',
			description: 'File upload with custom trigger snippet and ARIA validation',
			href: '/components/file-input',
			kanji: '档'
		},
		{
			title: 'SearchInput',
			description: 'Search input with clear button and role=search',
			href: '/components/search-input',
			kanji: '探'
		},
		{
			title: 'NumberInput',
			description: 'Number input with increment/decrement controls and min/max',
			href: '/components/number-input',
			kanji: '数'
		},
		{
			title: 'Tabs',
			description: 'Compound tabs with roving tabindex and keyboard navigation',
			href: '/components/tabs',
			kanji: '段'
		},
		{
			title: 'Accordion',
			description: 'Collapsible sections with single/multiple modes',
			href: '/components/accordion',
			kanji: '畳'
		},
		{
			title: 'Breadcrumb',
			description: 'Breadcrumb trail with aria-current and custom separator',
			href: '/components/breadcrumb',
			kanji: '路'
		},
		{
			title: 'Pagination',
			description: 'Headless pagination with ellipsis and page state',
			href: '/components/pagination',
			kanji: '頁'
		},
		{
			title: 'Link',
			description: 'Anchor with external detection and aria-current',
			href: '/components/link',
			kanji: '繋'
		},
		{
			title: 'Menu',
			description: 'Compound dropdown menu with portal + floating-ui positioning',
			href: '/components/menu',
			kanji: '献'
		},
		{
			title: 'Modal',
			description: 'Modal dialog with backdrop, focus trap, and Escape close',
			href: '/components/modal',
			kanji: '壁'
		},
		{
			title: 'Dialog',
			description: 'Non-modal dialog variant — same anatomy as Modal',
			href: '/components/dialog',
			kanji: '話'
		},
		{
			title: 'Drawer',
			description: 'Side panel sliding from any edge with focus trap',
			href: '/components/drawer',
			kanji: '引'
		},
		{
			title: 'Tooltip',
			description: 'Hover/focus tooltip with floating-ui positioning',
			href: '/components/tooltip',
			kanji: '説'
		},
		{
			title: 'Popover',
			description: 'Click-toggled floating panel with outside-click close',
			href: '/components/popover',
			kanji: '泡'
		},
		{
			title: 'Dropdown',
			description: 'Button-triggered menu with keyboard navigation',
			href: '/components/dropdown',
			kanji: '下'
		},
		{
			title: 'Card',
			description: 'Card container with header/title/description/content/footer',
			href: '/components/card',
			kanji: '札'
		},
		{
			title: 'Image',
			description: 'Image with lazy loading, placeholder, and error fallback',
			href: '/components/image',
			kanji: '画'
		},
		{
			title: 'List',
			description: 'Semantic ul/ol with explicit list role and ListItem',
			href: '/components/list',
			kanji: '列'
		},
		{
			title: 'DataList',
			description: 'Semantic dl/dt/dd for key-value pairs',
			href: '/components/data-list',
			kanji: '表'
		},
		{
			title: 'InputGroup',
			description: 'Input with prefix and suffix addon snippets',
			href: '/components/input-group',
			kanji: '組'
		},
		{
			title: 'Rating',
			description: 'Star rating with keyboard nav and aria-valuetext',
			href: '/components/rating',
			kanji: '星'
		},
		{
			title: 'Table',
			description: 'Semantic table with scope, aria-sort, caption, headers',
			href: '/components/table',
			kanji: '表'
		},
		{
			title: 'TreeView',
			description: 'Hierarchical tree with aria-expanded and keyboard nav',
			href: '/components/tree-view',
			kanji: '樹'
		},
		{
			title: 'Timeline',
			description: 'Vertical or horizontal timeline with markers and status',
			href: '/components/timeline',
			kanji: '時'
		}
	];

	const features = [
		{ title: 'Accessibility', kanji: 'アクセシビリティ', desc: 'WCAG 2.1 AA compliant' },
		{ title: 'Unstyled', kanji: '自由', desc: 'Complete styling freedom' },
		{ title: 'Keyboard', kanji: 'キーボード', desc: 'Full navigation support' },
		{ title: 'Svelte 5', kanji: '最新', desc: 'Modern runes mode' }
	];
</script>

<svelte:head>
	<title>Alus · Accessible Svelte 5 Components</title>
	<meta
		name="description"
		content="Unstyled, accessible Svelte 5 components. WCAG 2.1 AA compliant with traditional Japanese aesthetic."
	/>
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-(--indigo-dye) focus:px-4 focus:py-2 focus:text-white"
>
	Skip to content
</a>

<main id="main">
	<!-- Hero Section -->
	<section class="relative mb-20 overflow-hidden">
		<!-- Background Pattern -->
		<div class="seigaiha-pattern absolute inset-0 opacity-30"></div>

		<div class="relative">
			<!-- Vertical Text -->
			<div class="absolute top-0 right-0 hidden lg:block">
				<div
					class="vertical-text font-display text-[8rem] leading-none font-light text-(--indigo-dye)/5"
				>
					美
				</div>
			</div>

			<div class="py-16 lg:py-24">
				<!-- Hanko Seal -->
				<div class="animate-fade-in-up mb-8">
					<div class="hanko-seal text-2xl">至</div>
				</div>

				<!-- Main Title -->
				<h1
					class="font-display animate-fade-in-up animation-delay-100 mb-6 text-5xl font-light text-(--ink) md:text-7xl lg:text-8xl"
				>
					Alus
				</h1>

				<!-- Subtitle -->
				<p
					class="animate-fade-in-up animation-delay-200 mb-4 text-xl text-(--charcoal)/70 md:text-2xl"
				>
					Accessible Svelte Components
				</p>

				<!-- Japanese Subtitle -->
				<p
					class="font-display animate-fade-in-up animation-delay-300 mb-12 text-lg text-(--bamboo)"
				>
					美しさと accessibility の調和
				</p>

				<!-- Feature Badges -->
				<div class="animate-fade-in-up animation-delay-400 flex flex-wrap gap-3">
					{#each features as feature}
						<div class="japanese-border bg-white/50 px-4 py-2 backdrop-blur-sm">
							<span class="text-sm text-(--charcoal)/80">
								<span class="font-display text-(--bamboo)">{feature.kanji}</span>
								<span class="mx-2">·</span>
								{feature.desc}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Components Section -->
	<section class="mb-20">
		<div class="mb-12 flex items-center gap-4">
			<div class="h-px flex-1 bg-linear-to-r from-transparent to-(--indigo-dye)/20"></div>
			<div>
				<h2 class="font-display text-center text-3xl text-(--ink) md:text-4xl">Components</h2>
				<p class="mt-1 text-center text-sm tracking-widest text-(--bamboo)">コンポーネント</p>
			</div>
			<div class="h-px flex-1 bg-linear-to-l from-transparent to-(--indigo-dye)/20"></div>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			{#each components as comp, index}
				<a
					href={comp.href}
					class="group japanese-border relative bg-white p-8 transition-all duration-300 hover:border-(--vermilion)"
					onmouseenter={() => (hoverCard = comp.title)}
					onmouseleave={() => (hoverCard = null)}
					style="animation: fadeInUp 0.6s ease-out {index * 0.1}s both;"
				>
					<!-- Hover Effect -->
					<div
						class="absolute inset-0 bg-(--indigo-dye)/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>

					<div class="relative">
						<!-- Kanji Character -->
						<div
							class="font-display absolute -top-4 -right-2 text-6xl text-(--indigo-dye)/10 transition-colors duration-300 group-hover:text-(--vermilion)/20"
						>
							{comp.kanji}
						</div>

						<!-- Title -->
						<h3
							class="font-display mb-3 text-2xl text-(--ink) transition-colors duration-300 group-hover:text-(--vermilion)"
						>
							{comp.title}
						</h3>

						<!-- Description -->
						<p class="mb-4 text-(--charcoal)/70">
							{comp.description}
						</p>

						<!-- Arrow Indicator -->
						<div
							class="flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 group-hover:text-(--vermilion)"
						>
							<span class="text-sm font-medium">Explore</span>
							<CaretRight
								class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
							/>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Philosophy Section -->
	<section class="mb-16">
		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8 md:p-12">
			<div class="grid items-center gap-12 md:grid-cols-2">
				<div>
					<h2 class="font-display mb-6 text-3xl text-(--ink) md:text-4xl">Philosophy</h2>
					<p class="mb-6 leading-relaxed text-(--charcoal)/70">
						Alus embodies the Japanese principle of <span class="font-display text-(--bamboo)"
							>間 (ma)</span
						> — the conscious use of negative space. Our components are unstyled canvases, allowing your
						creativity to flow freely while maintaining accessibility at their core.
					</p>
					<p class="leading-relaxed text-(--charcoal)/70">
						Each component is crafted with precision, inspired by traditional Japanese aesthetics
						where simplicity meets functionality.
					</p>
				</div>
				<div class="text-center">
					<div class="font-display text-[10rem] leading-none text-(--indigo-dye)/10">和</div>
					<p class="mt-4 text-sm tracking-widest text-(--bamboo)">HARMONY · PEACE · JAPAN</p>
				</div>
			</div>
		</div>
	</section>
</main>
