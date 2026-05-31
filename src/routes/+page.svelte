<script lang="ts">
	import { CaretRight, MagnifyingGlass } from 'phosphor-svelte';
	import {
		CommandMenu,
		CommandMenuContent,
		CommandMenuInput,
		CommandMenuList,
		CommandMenuItem,
		CommandMenuGroup,
		CommandMenuEmpty
	} from 'alus-ui';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	type Category =
		| 'Form'
		| 'Date & Time'
		| 'Navigation'
		| 'Feedback'
		| 'Display'
		| 'Overlay'
		| 'Layout'
		| 'Interactive'
		| 'Utility';

	interface ComponentCard {
		title: string;
		description: string;
		href: string;
		kanji: string;
		category: Category;
		is_new?: boolean;
	}

	const components: ComponentCard[] = [
		// Form
		{
			title: 'Button',
			description: 'Accessible button with ARIA support and toggle states',
			href: '/components/button',
			kanji: 'ボタン',
			category: 'Form'
		},
		{
			title: 'Input',
			description: 'Text input with validation, error states, and accessibility',
			href: '/components/input',
			kanji: '入力',
			category: 'Form'
		},
		{
			title: 'Checkbox',
			description: 'Checkbox with indeterminate state and proper ARIA support',
			href: '/components/checkbox',
			kanji: 'チェック',
			category: 'Form'
		},
		{
			title: 'Radio',
			description: 'Radio button with keyboard navigation and accessibility',
			href: '/components/radio',
			kanji: '選択',
			category: 'Form'
		},
		{
			title: 'Textarea',
			description: 'Multi-line text input with validation and accessibility',
			href: '/components/textarea',
			kanji: '文',
			category: 'Form'
		},
		{
			title: 'Select',
			description: 'Native dropdown select with single/multiple selection',
			href: '/components/select',
			kanji: '択',
			category: 'Form'
		},
		{
			title: 'Fieldset',
			description: 'Group related form fields with legend and accessibility',
			href: '/components/fieldset',
			kanji: '組',
			category: 'Form'
		},
		{
			title: 'RadioGroup',
			description: 'Radio button group with shared name context and orientation',
			href: '/components/radio-group',
			kanji: '群',
			category: 'Form'
		},
		{
			title: 'Form',
			description: 'Form wrapper with submit handling and ARIA labels',
			href: '/components/form',
			kanji: '式',
			category: 'Form'
		},
		{
			title: 'Label',
			description: 'Form label with for-association and required indicator',
			href: '/components/label',
			kanji: '札',
			category: 'Form'
		},
		{
			title: 'Switch',
			description: 'Toggle switch with role=switch and keyboard support',
			href: '/components/switch',
			kanji: '切',
			category: 'Form'
		},
		{
			title: 'Slider',
			description: 'Range slider with min/max/step and accessible keyboard control',
			href: '/components/slider',
			kanji: '滑',
			category: 'Form'
		},
		{
			title: 'FileInput',
			description: 'File upload with custom trigger snippet and ARIA validation',
			href: '/components/file-input',
			kanji: '档',
			category: 'Form'
		},
		{
			title: 'SearchInput',
			description: 'Search input with clear button and role=search',
			href: '/components/search-input',
			kanji: '探',
			category: 'Form'
		},
		{
			title: 'NumberInput',
			description: 'Number input with increment/decrement controls and min/max',
			href: '/components/number-input',
			kanji: '数',
			category: 'Form'
		},
		{
			title: 'InputGroup',
			description: 'Input with prefix and suffix addon snippets',
			href: '/components/input-group',
			kanji: '組',
			category: 'Form'
		},
		{
			title: 'Rating',
			description: 'Star rating with keyboard nav and aria-valuetext',
			href: '/components/rating',
			kanji: '星',
			category: 'Form'
		},
		{
			title: 'IconButton',
			description: 'Icon-only button with required aria-label and toggle aria-pressed support',
			href: '/components/icon-button',
			kanji: '押',
			category: 'Form'
		},
		{
			title: 'ToggleButton',
			description: 'Two-state button with aria-pressed and bindable pressed prop',
			href: '/components/toggle-button',
			kanji: '押',
			category: 'Form'
		},
		{
			title: 'AutoComplete',
			description: 'Combobox input with filtered suggestions and aria-activedescendant',
			href: '/components/auto-complete',
			kanji: '補',
			category: 'Form'
		},
		{
			title: 'ColorPicker',
			description: 'Native color input + hex text + optional swatch grid',
			href: '/components/color-picker',
			kanji: '色',
			category: 'Form'
		},

		// Date & Time
		{
			title: 'Calendar',
			description: 'Month grid with full keyboard nav, locale weekdays, min/max bounds',
			href: '/components/calendar',
			kanji: '暦',
			category: 'Date & Time'
		},
		{
			title: 'DatePicker',
			description: 'Input button + Calendar popover with Floating UI positioning',
			href: '/components/date-picker',
			kanji: '日',
			category: 'Date & Time'
		},
		{
			title: 'DateRange',
			description: 'Two-click range selection with hover preview and 1/2 month layout',
			href: '/components/date-range',
			kanji: '範',
			category: 'Date & Time'
		},
		{
			title: 'DateRangePicker',
			description: 'Button trigger + popover hosting a two-month DateRange',
			href: '/components/date-range-picker',
			kanji: '期',
			category: 'Date & Time'
		},
		{
			title: 'TimePicker',
			description: 'Hour/minute(/second) inputs with ArrowUp/Down stepping and AM/PM toggle',
			href: '/components/time-picker',
			kanji: '時',
			category: 'Date & Time'
		},

		// Navigation
		{
			title: 'Tabs',
			description: 'Compound tabs with roving tabindex and keyboard navigation',
			href: '/components/tabs',
			kanji: '段',
			category: 'Navigation'
		},
		{
			title: 'Accordion',
			description: 'Collapsible sections with single/multiple modes',
			href: '/components/accordion',
			kanji: '畳',
			category: 'Navigation'
		},
		{
			title: 'Breadcrumb',
			description: 'Breadcrumb trail with aria-current and custom separator',
			href: '/components/breadcrumb',
			kanji: '路',
			category: 'Navigation'
		},
		{
			title: 'Pagination',
			description: 'Headless pagination with ellipsis and page state',
			href: '/components/pagination',
			kanji: '頁',
			category: 'Navigation'
		},
		{
			title: 'Link',
			description: 'Anchor with external detection and aria-current',
			href: '/components/link',
			kanji: '繋',
			category: 'Navigation'
		},
		{
			title: 'ExternalLink',
			description: 'target=_blank with rel=noopener and sr-only new-tab announcement',
			href: '/components/external-link',
			kanji: '外',
			category: 'Navigation'
		},
		{
			title: 'Navigation',
			description: 'Semantic <nav> wrapper with ARIA label and aria-current',
			href: '/components/navigation',
			kanji: '航',
			category: 'Navigation'
		},
		{
			title: 'Menu',
			description: 'Compound dropdown menu with portal + floating-ui positioning',
			href: '/components/menu',
			kanji: '献',
			category: 'Navigation'
		},
		{
			title: 'SubMenu',
			description: 'Nested menu inside Menu — ArrowRight opens, ArrowLeft closes',
			href: '/components/sub-menu',
			kanji: '枝',
			category: 'Navigation'
		},
		{
			title: 'Stepper',
			description: 'Wizard step indicator with completed/current/upcoming states',
			href: '/components/stepper',
			kanji: '階',
			category: 'Navigation'
		},
		{
			title: 'CommandMenu',
			description: 'Cmd+K command palette with search, groups, and keyboard nav',
			href: '/components/command-menu',
			kanji: '命',
			category: 'Navigation'
		},

		// Feedback
		{
			title: 'Badge',
			description: 'Status indicator with ARIA live regions and variant support',
			href: '/components/badge',
			kanji: '章',
			category: 'Feedback'
		},
		{
			title: 'Tag',
			description: 'Removable tag with dismiss button and keyboard support',
			href: '/components/tag',
			kanji: '標',
			category: 'Feedback'
		},
		{
			title: 'Spinner',
			description: 'Loading spinner with ARIA live region',
			href: '/components/spinner',
			kanji: '回',
			category: 'Feedback'
		},
		{
			title: 'Skeleton',
			description: 'Loading placeholder for content blocks',
			href: '/components/skeleton',
			kanji: '骨',
			category: 'Feedback'
		},
		{
			title: 'Progress',
			description: 'Progress bar with value/indeterminate states',
			href: '/components/progress',
			kanji: '進',
			category: 'Feedback'
		},
		{
			title: 'Alert',
			description: 'Notification banner with variants and dismiss',
			href: '/components/alert',
			kanji: '報',
			category: 'Feedback'
		},
		{
			title: 'Callout',
			description: 'Highlighted info box with title, icon, variants, and role=note',
			href: '/components/callout',
			kanji: '枠',
			category: 'Feedback'
		},
		{
			title: 'Banner',
			description: 'Page-level alert strip with variants, dismissible, and role switching',
			href: '/components/banner',
			kanji: '幕',
			category: 'Feedback'
		},
		{
			title: 'InlineMessage',
			description: 'Inline form-field message with auto role=alert for error/warning',
			href: '/components/inline-message',
			kanji: '伝',
			category: 'Feedback'
		},
		{
			title: 'LiveRegion',
			description: 'Screen-reader announcer with polite/assertive politeness levels',
			href: '/components/live-region',
			kanji: '声',
			category: 'Feedback'
		},
		{
			title: 'NotificationBell',
			description: 'Bell button with unread badge, max cap, and aria-live announcer',
			href: '/components/notification-bell',
			kanji: '鈴',
			category: 'Feedback'
		},
		{
			title: 'Toast',
			description: 'Portal toast stack with variants, action, persistent, and auto-dismiss',
			href: '/components/toast',
			kanji: '告',
			category: 'Feedback'
		},

		// Display
		{
			title: 'Card',
			description: 'Card container with header/title/description/content/footer',
			href: '/components/card',
			kanji: '札',
			category: 'Display'
		},
		{
			title: 'Avatar',
			description: 'User avatar with image fallback to initials or placeholder',
			href: '/components/avatar',
			kanji: '顔',
			category: 'Display'
		},
		{
			title: 'Image',
			description: 'Image with lazy loading, placeholder, and error fallback',
			href: '/components/image',
			kanji: '画',
			category: 'Display'
		},
		{
			title: 'List',
			description: 'Semantic ul/ol with explicit list role and ListItem',
			href: '/components/list',
			kanji: '列',
			category: 'Display'
		},
		{
			title: 'DataList',
			description: 'Semantic dl/dt/dd for key-value pairs',
			href: '/components/data-list',
			kanji: '表',
			category: 'Display'
		},
		{
			title: 'Divider',
			description: 'Visual separator with horizontal and vertical orientations',
			href: '/components/divider',
			kanji: '線',
			category: 'Display'
		},
		{
			title: 'Kbd',
			description: 'Semantic <kbd> wrapper for keyboard shortcuts with key arrays',
			href: '/components/kbd',
			kanji: '鍵',
			category: 'Display'
		},
		{
			title: 'AspectRatio',
			description: 'Constant width/height container using CSS aspect-ratio',
			href: '/components/aspect-ratio',
			kanji: '割',
			category: 'Display'
		},
		{
			title: 'Frame',
			description: 'Fixed-size container with overflow control and min/max bounds',
			href: '/components/frame',
			kanji: '枠',
			category: 'Display'
		},
		{
			title: 'Timestamp',
			description: 'Semantic <time> with relative formatting via Intl.RelativeTimeFormat',
			href: '/components/timestamp',
			kanji: '時',
			category: 'Display'
		},
		{
			title: 'CodeBlock',
			description: 'Pre/code wrapper with optional line numbers and copy action snippet',
			href: '/components/code-block',
			kanji: '码',
			category: 'Display'
		},
		{
			title: 'StatCard',
			description: 'Metric tile with label, value, trend indicator, and change snippet',
			href: '/components/stat-card',
			kanji: '数',
			category: 'Display'
		},
		{
			title: 'Table',
			description: 'Semantic table with scope, aria-sort, caption, headers',
			href: '/components/table',
			kanji: '表',
			category: 'Display'
		},
		{
			title: 'TreeView',
			description: 'Hierarchical tree with aria-expanded and keyboard nav',
			href: '/components/tree-view',
			kanji: '樹',
			category: 'Display'
		},
		{
			title: 'Timeline',
			description: 'Vertical or horizontal timeline with markers and status',
			href: '/components/timeline',
			kanji: '時',
			category: 'Display'
		},
		{
			title: 'Compare',
			description: 'Compare slider revealing one layer over another with role=slider',
			href: '/components/compare',
			kanji: '比',
			category: 'Display'
		},
		{
			title: 'Carousel',
			description: 'Slide carousel with prev/next, indicators, and loop',
			href: '/components/carousel',
			kanji: '輪',
			category: 'Display'
		},

		// Overlay
		{
			title: 'Modal',
			description: 'Modal dialog with backdrop, focus trap, and Escape close',
			href: '/components/modal',
			kanji: '壁',
			category: 'Overlay'
		},
		{
			title: 'Dialog',
			description: 'Non-modal dialog variant — same anatomy as Modal',
			href: '/components/dialog',
			kanji: '話',
			category: 'Overlay'
		},
		{
			title: 'Drawer',
			description: 'Side panel sliding from any edge with focus trap',
			href: '/components/drawer',
			kanji: '引',
			category: 'Overlay'
		},
		{
			title: 'Sheet',
			description: 'iOS-style side panel — re-export of Drawer',
			href: '/components/sheet',
			kanji: '紙',
			category: 'Overlay'
		},
		{
			title: 'Tooltip',
			description: 'Hover/focus tooltip with floating-ui positioning',
			href: '/components/tooltip',
			kanji: '説',
			category: 'Overlay'
		},
		{
			title: 'Popover',
			description: 'Click-toggled floating panel with outside-click close',
			href: '/components/popover',
			kanji: '泡',
			category: 'Overlay'
		},
		{
			title: 'Dropdown',
			description: 'Button-triggered menu with keyboard navigation',
			href: '/components/dropdown',
			kanji: '下',
			category: 'Overlay'
		},
		{
			title: 'Overlay',
			description: 'Low-level backdrop primitive with portal, Escape, and outside-click',
			href: '/components/overlay',
			kanji: '蓋',
			category: 'Overlay'
		},
		{
			title: 'Lightbox',
			description: 'Image overlay viewer with prev/next, keyboard arrows, and loop',
			href: '/components/lightbox',
			kanji: '写',
			category: 'Overlay'
		},
		{
			title: 'ContextMenu',
			description: 'Right-click context menu with keyboard nav and viewport-aware positioning',
			href: '/components/context-menu',
			kanji: '右',
			category: 'Overlay'
		},

		// Layout
		{
			title: 'Layout',
			description: 'Stack, Flex, Grid, Container, Spacer, Columns — structure primitives',
			href: '/components/layout',
			kanji: '構',
			category: 'Layout'
		},

		// Interactive
		{
			title: 'Sortable',
			description: 'Drag-and-drop list with keyboard reorder and roving tabindex',
			href: '/components/sortable',
			kanji: '並',
			category: 'Interactive'
		},
		{
			title: 'Swipeable',
			description: 'Pointer swipe handler with direction, threshold, and velocity',
			href: '/components/swipeable',
			kanji: '掃',
			category: 'Interactive'
		},
		{
			title: 'Resizable',
			description: 'Resizable container with draggable handle and keyboard step',
			href: '/components/resizable',
			kanji: '伸',
			category: 'Interactive'
		},
		{
			title: 'SplitView',
			description: 'Two-pane split view with separator role and keyboard resize',
			href: '/components/split-view',
			kanji: '分',
			category: 'Interactive'
		},
		{
			title: 'Draggable',
			description: 'HTML5 drag wrapper with JSON payload and dragging state',
			href: '/components/draggable',
			kanji: '掴',
			category: 'Interactive'
		},
		{
			title: 'Droppable',
			description: 'Drop zone counterpart to Draggable with over-state and effect',
			href: '/components/droppable',
			kanji: '受',
			category: 'Interactive'
		},
		{
			title: 'InfiniteScroll',
			description: 'IntersectionObserver sentinel that calls onLoad until hasMore is false',
			href: '/components/infinite-scroll',
			kanji: '続',
			category: 'Interactive'
		},
		{
			title: 'VirtualList',
			description: 'Windowed scrolling for huge lists with fixed itemHeight and overscan',
			href: '/components/virtual-list',
			kanji: '虚',
			category: 'Interactive'
		},

		// Utility
		{
			title: 'VisuallyHidden',
			description: 'Screen-reader only content, visually hidden but accessible',
			href: '/components/visually-hidden',
			kanji: '隠',
			category: 'Utility'
		},
		{
			title: 'Portal',
			description: 'Teleport content to document.body or any target element',
			href: '/components/portal',
			kanji: '門',
			category: 'Utility'
		},
		{
			title: 'FocusTrap',
			description: 'Trap keyboard focus within a container for modals and dialogs',
			href: '/components/focus-trap',
			kanji: '罠',
			category: 'Utility'
		},
		{
			title: 'ScreenReaderOnly',
			description: 'Alias of VisuallyHidden — content only announced to screen readers',
			href: '/components/screen-reader-only',
			kanji: '読',
			category: 'Utility'
		},
		{
			title: 'Conditional',
			description: 'Render children when condition is truthy, else fallback snippet',
			href: '/components/conditional',
			kanji: '条',
			category: 'Utility'
		}
	];

	const categories: { id: Category; label: string; kanji: string }[] = [
		{ id: 'Form', label: 'Form', kanji: '入' },
		{ id: 'Date & Time', label: 'Date & Time', kanji: '暦' },
		{ id: 'Navigation', label: 'Navigation', kanji: '航' },
		{ id: 'Feedback', label: 'Feedback', kanji: '報' },
		{ id: 'Display', label: 'Display', kanji: '展' },
		{ id: 'Overlay', label: 'Overlay', kanji: '蓋' },
		{ id: 'Layout', label: 'Layout', kanji: '構' },
		{ id: 'Interactive', label: 'Interactive', kanji: '動' },
		{ id: 'Utility', label: 'Utility', kanji: '具' }
	];

	function slugify(c: Category): string {
		return c.toLowerCase().replace(/[^a-z]+/g, '-');
	}
	function fromSlug(s: string | null): Category | null {
		if (!s) return null;
		return categories.find((c) => slugify(c.id) === s)?.id ?? null;
	}

	let active = $state<Category>(fromSlug(page.url.searchParams.get('c')) ?? 'Form');

	$effect(() => {
		const slug = slugify(active);
		const current = page.url.searchParams.get('c');
		if (current === slug) return;
		const url = new URL(page.url);
		url.searchParams.set('c', slug);
		goto(url, { replaceState: true, noScroll: true, keepFocus: true });
	});

	// Hash deep-link: #input → switch to that card's category, scroll, flash
	const hrefBySlug = new Map(components.map((c) => [c.href.split('/').pop()!, c]));
	$effect(() => {
		const hash = page.url.hash.replace(/^#/, '');
		if (!hash) return;
		const comp = hrefBySlug.get(hash);
		if (!comp) return;
		if (active !== comp.category) active = comp.category;
		queueMicrotask(() => {
			const el = document.getElementById(`card-${hash}`);
			if (!el) return;
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
			el.classList.remove('flash');
			void el.offsetWidth;
			el.classList.add('flash');
		});
	});

	const visible = $derived(components.filter((c) => c.category === active));
	const counts = $derived(
		Object.fromEntries(
			categories.map((c) => [c.id, components.filter((x) => x.category === c.id).length])
		)
	);

	let tablistEl: HTMLDivElement | undefined = $state();

	function focusTab(idx: number) {
		const tabs = tablistEl?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
		if (!tabs) return;
		const t = tabs[idx];
		if (t) {
			active = categories[idx].id;
			queueMicrotask(() => t.focus());
		}
	}

	function onTablistKeydown(e: KeyboardEvent) {
		const idx = categories.findIndex((c) => c.id === active);
		if (idx === -1) return;
		const last = categories.length - 1;
		switch (e.key) {
			case 'ArrowRight':
				e.preventDefault();
				focusTab(idx === last ? 0 : idx + 1);
				break;
			case 'ArrowLeft':
				e.preventDefault();
				focusTab(idx === 0 ? last : idx - 1);
				break;
			case 'Home':
				e.preventDefault();
				focusTab(0);
				break;
			case 'End':
				e.preventDefault();
				focusTab(last);
				break;
		}
	}

	// Cmd+K command palette
	let paletteOpen = $state(false);

	function onWindowKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			paletteOpen = !paletteOpen;
		}
	}

	async function pick(href: string) {
		paletteOpen = false;
		await goto(href);
	}

	const grouped = $derived(
		categories.map((cat) => ({
			cat,
			items: components.filter((c) => c.category === cat.id)
		}))
	);

	const features = [
		{ title: 'Accessibility', kanji: 'アクセシビリティ', desc: 'WCAG 2.1 AA compliant' },
		{ title: 'Unstyled', kanji: '自由', desc: 'Complete styling freedom' },
		{ title: 'Keyboard', kanji: 'キーボード', desc: 'Full navigation support' },
		{ title: 'Svelte 5', kanji: '最新', desc: 'Modern runes mode' }
	];
</script>

<svelte:window onkeydown={onWindowKeydown} />

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
	<!-- Hero -->
	<section class="relative mb-12 overflow-hidden">
		<div class="seigaiha-pattern absolute inset-0 opacity-30"></div>

		<div class="relative">
			<div class="absolute top-0 right-0 hidden lg:block">
				<div
					class="vertical-text font-display text-[8rem] leading-none font-light text-(--indigo-dye)/5"
				>
					美
				</div>
			</div>

			<div class="py-12 lg:py-16">
				<div class="animate-fade-in-up mb-6">
					<div class="hanko-seal text-2xl">至</div>
				</div>

				<h1
					class="font-display animate-fade-in-up animation-delay-100 mb-4 text-5xl font-light text-(--ink) md:text-7xl lg:text-8xl"
				>
					Alus
				</h1>

				<p
					class="animate-fade-in-up animation-delay-200 mb-2 text-xl text-(--charcoal)/70 md:text-2xl"
				>
					Accessible Svelte Components
				</p>

				<p class="font-display animate-fade-in-up animation-delay-300 mb-6 text-lg text-(--bamboo)">
					美しさと accessibility の調和
				</p>

				<div class="animate-fade-in-up animation-delay-400 flex flex-wrap items-center gap-3">
					{#each features as feature, i (i)}
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
	<section class="mb-16">
		<div class="mb-6 flex items-center gap-4">
			<div class="h-px flex-1 bg-linear-to-r from-transparent to-(--indigo-dye)/20"></div>
			<div>
				<h2 class="font-display text-center text-3xl text-(--ink) md:text-4xl">Components</h2>
				<p class="mt-1 text-center text-sm tracking-widest text-(--bamboo)">
					{components.length} primitives · コンポーネント
				</p>
			</div>
			<div class="h-px flex-1 bg-linear-to-l from-transparent to-(--indigo-dye)/20"></div>
		</div>

		<div class="mb-8 flex justify-center">
			<button
				type="button"
				onclick={() => (paletteOpen = true)}
				class="group inline-flex items-center gap-3 border border-(--indigo-dye)/30 bg-white px-4 py-2.5 text-(--charcoal) shadow-sm transition-colors hover:border-(--vermilion) hover:shadow-[4px_4px_0_0_var(--indigo-dye)]"
				aria-label="Open search palette"
			>
				<MagnifyingGlass class="h-4 w-4 text-(--charcoal)/50" />
				<span class="text-sm text-(--charcoal)/60">Search components…</span>
				<kbd
					class="rounded border border-(--charcoal)/20 bg-(--paper-white) px-2 py-0.5 font-mono text-[10px] text-(--charcoal)/70"
				>
					⌘K
				</kbd>
			</button>
		</div>

		<!-- Sticky category bar — horizontal scroll on narrow viewports -->
		<div
			class="sticky -top-px z-40 -mx-4 mb-8 border-y border-(--indigo-dye)/15 bg-(--paper-white)/85 backdrop-blur-md"
		>
			<div class="tab-fade relative">
				<div
					bind:this={tablistEl}
					role="tablist"
					aria-label="Component categories"
					aria-orientation="horizontal"
					tabindex="-1"
					onkeydown={onTablistKeydown}
					class="flex snap-x snap-mandatory items-stretch gap-1.5 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				>
					{#each categories as cat (cat.id)}
						{@const isActive = active === cat.id}
						<button
							role="tab"
							type="button"
							id="tab-{slugify(cat.id)}"
							aria-selected={isActive}
							aria-controls="component-grid"
							tabindex={isActive ? 0 : -1}
							onclick={() => (active = cat.id)}
							class="group relative flex shrink-0 snap-start items-center gap-2 px-3 py-1.5 text-sm transition-colors focus-visible:outline-none"
						>
							<span
								class="font-display text-base transition-colors {isActive
									? 'text-(--vermilion)'
									: 'text-(--indigo-dye)/40 group-hover:text-(--indigo-dye)/70'}"
							>
								{cat.kanji}
							</span>
							<span
								class="transition-colors {isActive
									? 'font-medium text-(--ink)'
									: 'text-(--charcoal)/60 group-hover:text-(--ink)'}"
							>
								{cat.label}
							</span>
							<span
								class="rounded-full px-1.5 py-0.5 text-[10px] tracking-wide tabular-nums transition-colors {isActive
									? 'bg-(--indigo-dye) text-white'
									: 'bg-(--indigo-dye)/8 text-(--charcoal)/50'}"
							>
								{counts[cat.id]}
							</span>
							{#if isActive}
								<span
									class="absolute right-0 -bottom-2 left-0 h-0.5 bg-(--vermilion)"
									aria-hidden="true"
								></span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Filtered grid -->
		<div
			id="component-grid"
			role="tabpanel"
			aria-labelledby="tab-{slugify(active)}"
			tabindex="0"
			class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		>
			{#each visible as comp, index (comp.href)}
				{@const slug = comp.href.split('/').pop()}
				<a
					id="card-{slug}"
					href={comp.href}
					data-card={slug}
					class="card group relative block overflow-hidden border border-(--indigo-dye)/15 bg-white p-5 transition-all duration-300 hover:border-(--vermilion) hover:shadow-[4px_4px_0_0_var(--indigo-dye)] focus-visible:border-(--vermilion) focus-visible:shadow-[4px_4px_0_0_var(--indigo-dye)] focus-visible:outline-none"
					style="animation: fadeInUp 0.4s ease-out {Math.min(index, 12) * 0.04}s both;"
				>
					<span
						aria-hidden="true"
						class="absolute top-0 left-0 h-2 w-2 bg-(--vermilion) opacity-70 transition-opacity group-hover:opacity-100"
					></span>

					{#if comp.is_new}
						<span
							class="font-display absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-(--vermilion) px-2 py-0.5 text-[10px] font-medium tracking-wider text-white"
							aria-label="Recently added"
						>
							新 New
						</span>
					{/if}

					<div
						class="font-display absolute -top-3 -right-1 hidden text-4xl text-(--indigo-dye)/8 transition-colors duration-300 group-hover:text-(--vermilion)/15 sm:block md:text-5xl"
						aria-hidden="true"
					>
						{comp.kanji}
					</div>

					<div class="relative">
						<h3
							class="font-display mb-2 pr-10 text-xl text-(--ink) transition-colors duration-300 group-hover:text-(--vermilion)"
						>
							{comp.title}
						</h3>
						<p class="card-desc text-sm leading-relaxed text-(--charcoal)/65">
							{comp.description}
						</p>
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

<!-- ⌘K Command Palette -->
<CommandMenu bind:open={paletteOpen}>
	<CommandMenuContent
		backdropClass="fixed inset-0 z-50 grid place-items-start justify-center bg-(--ink)/40 backdrop-blur-sm pt-[12vh]"
		class="w-full max-w-xl overflow-hidden rounded-lg border border-(--indigo-dye)/20 bg-white shadow-2xl"
		aria-label="Search components"
	>
		<div class="flex items-center gap-3 border-b border-(--indigo-dye)/10 px-4 py-3">
			<MagnifyingGlass class="h-4 w-4 text-(--charcoal)/50" />
			<CommandMenuInput
				class="flex-1 bg-transparent text-(--ink) placeholder:text-(--charcoal)/40 focus:outline-none"
				placeholder="Search by name, kanji, or description…"
				debounceMs={120}
			/>
			<kbd
				class="rounded border border-(--charcoal)/20 bg-(--paper-white) px-1.5 py-0.5 font-mono text-[10px] text-(--charcoal)/60"
			>
				Esc
			</kbd>
		</div>

		<CommandMenuList class="max-h-[60vh] overflow-y-auto p-2">
			<CommandMenuEmpty class="p-8 text-center text-sm text-(--charcoal)/50">
				No components found.
			</CommandMenuEmpty>

			{#each grouped as g (g.cat.id)}
				<CommandMenuGroup class="mb-1">
					<div
						class="font-display flex items-center gap-2 px-2 py-1 text-xs tracking-widest text-(--bamboo) uppercase"
					>
						<span class="font-display text-(--indigo-dye)/60">{g.cat.kanji}</span>
						<span>{g.cat.label}</span>
					</div>
					{#each g.items as c (c.href)}
						<CommandMenuItem
							value={c.title}
							keywords="{c.description} {c.kanji} {c.category}"
							onSelect={() => pick(c.href)}
							class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-highlighted:bg-(--cream)"
						>
							<span class="font-display w-6 shrink-0 text-(--indigo-dye)/70">{c.kanji}</span>
							<span class="flex-1 truncate text-(--ink)">{c.title}</span>
							{#if c.is_new}
								<span
									class="rounded-full bg-(--vermilion)/10 px-2 py-0.5 text-[10px] font-medium text-(--vermilion)"
								>
									新
								</span>
							{/if}
							<CaretRight class="h-3 w-3 text-(--charcoal)/30" />
						</CommandMenuItem>
					{/each}
				</CommandMenuGroup>
			{/each}
		</CommandMenuList>
	</CommandMenuContent>
</CommandMenu>

<style>
	.tab-fade::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 2rem;
		pointer-events: none;
		background: linear-gradient(to left, var(--paper-white), transparent);
	}

	.card-desc {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		max-height: 2.6rem;
		transition: max-height 280ms ease;
	}

	.card:hover .card-desc,
	.card:focus-visible .card-desc {
		-webkit-line-clamp: unset;
		line-clamp: unset;
		max-height: 10rem;
	}

	@keyframes cardFlash {
		0% {
			box-shadow: 0 0 0 0 var(--vermilion);
			border-color: var(--vermilion);
		}
		50% {
			box-shadow: 0 0 0 8px color-mix(in srgb, var(--vermilion) 30%, transparent);
		}
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}

	:global(.card.flash) {
		animation: cardFlash 1.2s ease-out;
	}
</style>
