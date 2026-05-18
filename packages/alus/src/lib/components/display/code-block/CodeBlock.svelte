<script lang="ts">
	interface Props {
		code: string;
		language?: string;
		filename?: string;
		showLineNumbers?: boolean;
		actions?: import('svelte').Snippet<[{ code: string; copy: () => Promise<void>; copied: boolean }]>;
		class?: string;
		preClass?: string;
		codeClass?: string;
		lineNumbersClass?: string;
		'aria-label'?: string;
	}

	let {
		code,
		language,
		filename,
		showLineNumbers = false,
		actions,
		class: className = '',
		preClass = '',
		codeClass = '',
		lineNumbersClass = '',
		'aria-label': ariaLabel
	}: Props = $props();

	let copied = $state(false);
	let resetHandle: ReturnType<typeof setTimeout> | null = null;

	const lines = $derived(code.replace(/\n$/, '').split('\n'));

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			if (resetHandle) clearTimeout(resetHandle);
			resetHandle = setTimeout(() => (copied = false), 1500);
		} catch {
			/* noop */
		}
	}
</script>

<div class={className} data-language={language} data-filename={filename}>
	{#if actions}
		{@render actions({ code, copy, copied })}
	{/if}
	<pre
		class={preClass}
		data-language={language}
		aria-label={ariaLabel ?? (language ? `${language} code` : 'code')}>{#if showLineNumbers}<span
				class={lineNumbersClass}
				aria-hidden="true"
				data-line-numbers>{#each lines as _, i}{i + 1}{#if i < lines.length - 1}{'\n'}{/if}{/each}</span><code
				class={codeClass}>{code}</code>{:else}<code class={codeClass}>{code}</code>{/if}</pre>
</div>
