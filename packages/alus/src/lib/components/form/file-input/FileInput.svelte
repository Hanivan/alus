<script lang="ts">
	import { labelAttrs, validationAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ files: FileList | null; open: () => void }]>;
		files?: FileList | null;
		accept?: string;
		multiple?: boolean;
		capture?: 'user' | 'environment';
		webkitdirectory?: boolean;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		id?: string;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: boolean;
		'aria-errormessage'?: string;
		onchange?: (files: FileList | null) => void;
	}

	let {
		children,
		files = $bindable(null),
		accept,
		multiple = false,
		capture,
		webkitdirectory,
		disabled = false,
		required = false,
		name,
		id,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrormessage,
		onchange
	}: Props = $props();

	let input: HTMLInputElement | undefined = $state();

	function open() {
		input?.click();
	}

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		files = target.files;
		onchange?.(files);
	}

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			validationAttrs({ invalid: ariaInvalid, required, errormessage: ariaErrormessage })
		)
	);
</script>

{#if children}
	<input
		bind:this={input}
		type="file"
		{id}
		{name}
		{accept}
		{multiple}
		{capture}
		{webkitdirectory}
		{disabled}
		{required}
		class="sr-only"
		style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"
		onchange={handleChange}
		{...ariaAttrs}
	/>
	{@render children({ files, open })}
{:else}
	<input
		type="file"
		{id}
		{name}
		{accept}
		{multiple}
		{capture}
		{webkitdirectory}
		{disabled}
		{required}
		class={className}
		onchange={handleChange}
		{...ariaAttrs}
	/>
{/if}
