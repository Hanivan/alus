<script lang="ts" module>
	function normalizeHex(v: string): string | null {
		let s = v.trim().replace(/^#/, '');
		if (/^[0-9a-fA-F]{3}$/.test(s)) {
			s = s
				.split('')
				.map((c) => c + c)
				.join('');
		}
		if (/^[0-9a-fA-F]{6}$/.test(s)) return '#' + s.toLowerCase();
		if (/^[0-9a-fA-F]{8}$/.test(s)) return '#' + s.toLowerCase();
		return null;
	}
</script>

<script lang="ts">
	interface Props {
		value?: string;
		swatches?: string[];
		showInput?: boolean;
		showNative?: boolean;
		disabled?: boolean;
		class?: string;
		nativeClass?: string;
		inputClass?: string;
		swatchesClass?: string;
		swatchClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		onChange?: (value: string) => void;
	}

	let {
		value = $bindable('#000000'),
		swatches,
		showInput = true,
		showNative = true,
		disabled = false,
		class: className = '',
		nativeClass = '',
		inputClass = '',
		swatchesClass = '',
		swatchClass = '',
		'aria-label': ariaLabel = 'Color',
		'aria-labelledby': ariaLabelledby,
		onChange
	}: Props = $props();

	let textValue = $state(value);

	$effect(() => {
		textValue = value;
	});

	function setHex(hex: string) {
		value = hex;
		onChange?.(hex);
	}

	function onNative(e: Event) {
		setHex((e.target as HTMLInputElement).value);
	}

	function onTextInput(e: Event) {
		const raw = (e.target as HTMLInputElement).value;
		textValue = raw;
		const n = normalizeHex(raw);
		if (n) setHex(n);
	}

	function pick(c: string) {
		const n = normalizeHex(c) ?? c;
		setHex(n);
	}
</script>

<div
	class={className}
	role="group"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-disabled={disabled || undefined}
>
	{#if showNative}
		<input
			type="color"
			aria-label={`${ariaLabel} picker`}
			{disabled}
			{value}
			class={nativeClass}
			oninput={onNative}
		/>
	{/if}
	{#if showInput}
		<input
			type="text"
			aria-label={`${ariaLabel} hex`}
			spellcheck="false"
			maxlength="9"
			{disabled}
			value={textValue}
			class={inputClass}
			oninput={onTextInput}
		/>
	{/if}
	{#if swatches && swatches.length}
		<div class={swatchesClass} role="listbox" aria-label="Color swatches">
			{#each swatches as c (c)}
				<button
					type="button"
					role="option"
					aria-selected={c.toLowerCase() === value.toLowerCase()}
					aria-label={c}
					{disabled}
					class={swatchClass}
					style={`background:${c};`}
					data-selected={c.toLowerCase() === value.toLowerCase() ? '' : undefined}
					onclick={() => pick(c)}
				></button>
			{/each}
		</div>
	{/if}
</div>
