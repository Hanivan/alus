<script lang="ts">
	import { CaretLeft, CaretRight, House } from 'phosphor-svelte';
	import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Breadcrumb>
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbSeparator>/</BreadcrumbSeparator>
	<BreadcrumbItem href="/products">Products</BreadcrumbItem>
	<BreadcrumbSeparator>/</BreadcrumbSeparator>
	<BreadcrumbItem current>Tea ware</BreadcrumbItem>
</Breadcrumb>`;
</script>

<svelte:head>
	<title>Breadcrumb · Alus Components</title>
</svelte:head>

<a
	href="/"
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">路</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Breadcrumb</h1>
				<p class="tracking-widest text-(--bamboo)">パンくず</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Navigation trail with <code class="rounded bg-(--cream) px-1">aria-current="page"</code> on the
			active item.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Default</span>
			<span class="ml-2 text-lg text-(--bamboo)">既定</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Breadcrumb listClass="flex flex-wrap items-center gap-2 text-sm">
				<BreadcrumbItem href="/" linkClass="text-(--indigo-dye) hover:text-(--vermilion)">
					Home
				</BreadcrumbItem>
				<BreadcrumbSeparator class="text-(--charcoal)/30">/</BreadcrumbSeparator>
				<BreadcrumbItem href="/components" linkClass="text-(--indigo-dye) hover:text-(--vermilion)">
					Components
				</BreadcrumbItem>
				<BreadcrumbSeparator class="text-(--charcoal)/30">/</BreadcrumbSeparator>
				<BreadcrumbItem current class="text-(--charcoal)">Breadcrumb</BreadcrumbItem>
			</Breadcrumb>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Custom Separator + Icon</span>
			<span class="ml-2 text-lg text-(--bamboo)">独自</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Breadcrumb listClass="flex flex-wrap items-center gap-2 text-sm">
				<BreadcrumbItem
					href="/"
					linkClass="inline-flex items-center gap-1 text-(--indigo-dye) hover:text-(--vermilion)"
				>
					<House class="h-4 w-4" />
					<span>Home</span>
				</BreadcrumbItem>
				<BreadcrumbSeparator class="text-(--charcoal)/30">
					<CaretRight class="h-3 w-3" />
				</BreadcrumbSeparator>
				<BreadcrumbItem href="/docs" linkClass="text-(--indigo-dye) hover:text-(--vermilion)">
					Docs
				</BreadcrumbItem>
				<BreadcrumbSeparator class="text-(--charcoal)/30">
					<CaretRight class="h-3 w-3" />
				</BreadcrumbSeparator>
				<BreadcrumbItem current class="text-(--vermilion)">Current page</BreadcrumbItem>
			</Breadcrumb>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'aria-label',
				type: 'string',
				default: "'Breadcrumb'",
				description: '<code>Breadcrumb</code>'
			},
			{
				name: 'href',
				type: 'string',
				default: 'undefined',
				description: '<code>BreadcrumbItem</code>'
			},
			{
				name: 'current',
				type: 'boolean',
				default: 'false',
				description: 'Last item — adds <code>aria-current="page"</code>'
			},
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">&lt;nav aria-label="Breadcrumb"&gt;</code> wraps an ordered list',
			'Final item carries <code class="rounded bg-(--cream) px-1">aria-current="page"</code> and is not a link',
			'Separators are <code class="rounded bg-(--cream) px-1">aria-hidden</code> — decorative only'
		]}
	/>
</main>
