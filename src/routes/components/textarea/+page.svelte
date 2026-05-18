<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Textarea } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Textarea } from 'alus-ui';
	let bio = $state('');
<\/script>

<Textarea
	bind:value={bio}
	rows={4}
	placeholder="Tell us about yourself…"
	maxlength={500}
	class="w-full rounded border-2 border-(--indigo-dye)/20 p-3 focus:border-(--indigo-dye)"
/>`;

	let bio = $state('');
</script>

<svelte:head>
	<title>Textarea · Alus Components</title>
	<meta name="description" content="Multi-line text input" />
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
			<div class="hanko-seal">文</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Textarea</h1>
				<p class="tracking-widest text-(--bamboo)">テキストエリア</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Multi-line text input with validation and accessibility built-in.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Basic</span>
			<span class="ml-2 text-lg text-(--bamboo)">基本</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<label for="bio" class="block text-sm font-medium text-(--charcoal)">Biography</label>
			<Textarea
				id="bio"
				bind:value={bio}
				rows={5}
				placeholder="Tell us about yourself..."
				class="w-full border border-(--indigo-dye)/20 bg-white p-3 focus:border-(--vermilion) focus-visible:outline-0"
			/>
			<p class="text-sm text-(--charcoal)/60">{bio.length} characters</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>With Validation</span>
			<span class="ml-2 text-lg text-(--bamboo)">検証</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<label for="comment" class="block text-sm font-medium text-(--charcoal)">
				Comment <span class="text-(--vermilion)">*</span>
			</label>
			<Textarea
				id="comment"
				rows={4}
				required
				minlength={10}
				maxlength={500}
				aria-describedby="comment-help"
				class="w-full border border-(--indigo-dye)/20 bg-white p-3 focus:border-(--vermilion) focus-visible:outline-0"
			/>
			<p id="comment-help" class="text-sm text-(--charcoal)/60">10–500 characters, required.</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'string', default: "''", description: 'Bindable' },
			{ name: 'rows', type: 'number', default: '3' },
			{ name: 'cols', type: 'number', default: 'undefined' },
			{ name: 'maxlength', type: 'number', default: 'undefined' },
			{ name: 'minlength', type: 'number', default: 'undefined' },
			{ name: 'placeholder', type: 'string', default: 'undefined' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'readonly', type: 'boolean', default: 'false' },
			{ name: 'aria-invalid', type: 'boolean', default: 'undefined' },
			{ name: 'aria-errormessage', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;textarea&gt;</code> — keyboard accessible by default',
			'<code class="rounded bg-(--cream) px-1">aria-invalid</code> + <code class="rounded bg-(--cream) px-1">aria-errormessage</code> for validation',
			'<code class="rounded bg-(--cream) px-1">aria-describedby</code> wires character counter / help text',
			'Pair with <code class="rounded bg-(--cream) px-1">&lt;Label for&gt;</code> or <code class="rounded bg-(--cream) px-1">aria-label</code>'
		]}
	/>
</main>
