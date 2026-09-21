<script lang="ts">
	import { labelAttrs, validationAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'children'> {
		children?: import('svelte').Snippet<[{ files: FileList | null; open: () => void }]>;
		files?: FileList | null;
		accept?: string;
		multiple?: boolean;
		capture?: 'user' | 'environment';
		webkitdirectory?: boolean;
		disabled?: boolean;
		required?: boolean;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: boolean;
		'aria-errormessage'?: string;
		style?: string;
		onFilesChange?: (files: FileList | null) => void;
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
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrormessage,
		style: extraStyle = '',
		onFilesChange,
		...rest
	}: Props = $props();

	let input: HTMLInputElement | undefined = $state();

	function open() {
		input?.click();
	}

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		files = target.files;
		onFilesChange?.(files);
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
		{...rest}
		bind:this={input}
		type="file"
		{accept}
		{multiple}
		{capture}
		{webkitdirectory}
		{disabled}
		{required}
		class="sr-only"
		style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;{extraStyle}"
		onchange={handleChange}
		{...ariaAttrs}
	/>
	{@render children({ files, open })}
{:else}
	<input
		{...rest}
		type="file"
		{accept}
		{multiple}
		{capture}
		{webkitdirectory}
		{disabled}
		{required}
		class={className}
		style={extraStyle || undefined}
		onchange={handleChange}
		{...ariaAttrs}
	/>
{/if}
