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
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		value?: string;
		swatches?: string[];
		showInput?: boolean;
		showNative?: boolean;
		disabled?: boolean;
		nativeClass?: string;
		inputClass?: string;
		swatchesClass?: string;
		swatchClass?: string;
		'aria-label'?: string;
		swatchesLabel?: string;
		nativeInputLabel?: string;
		onValueChange?: (value: string) => void;
	};

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
		swatchesLabel = 'Color swatches',
		nativeInputLabel = 'Color',
		onValueChange,
		...rest
	}: Props = $props();

	let textValue = $state(value);

	$effect(() => {
		textValue = value;
	});

	function setHex(hex: string) {
		value = hex;
		onValueChange?.(hex);
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

	let swatchListEl: HTMLDivElement | null = $state(null);
	let swatchFocusIndex = $state(0);

	function focusSwatch(i: number) {
		queueMicrotask(() => {
			const el = swatchListEl?.querySelectorAll<HTMLButtonElement>('[role="option"]')[i];
			el?.focus();
		});
	}

	function onSwatchKeydown(e: KeyboardEvent) {
		if (!swatches || !swatches.length) return;
		const n = swatches.length;
		let target = -1;
		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				target = (swatchFocusIndex + 1) % n;
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				target = (swatchFocusIndex - 1 + n) % n;
				break;
			case 'Home':
				target = 0;
				break;
			case 'End':
				target = n - 1;
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				pick(swatches[swatchFocusIndex]);
				return;
		}
		if (target >= 0) {
			e.preventDefault();
			swatchFocusIndex = target;
			focusSwatch(target);
		}
	}
</script>

<div
	{...rest}
	class={className}
	role="group"
	aria-label={ariaLabel}
	aria-disabled={disabled || undefined}
>
	{#if showNative}
		<input
			type="color"
			aria-label={nativeInputLabel}
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
		<div
			class={swatchesClass}
			role="listbox"
			tabindex="-1"
			aria-label={swatchesLabel}
			bind:this={swatchListEl}
			onkeydown={onSwatchKeydown}
		>
			{#each swatches as c, i (c)}
				{@const sel = c.toLowerCase() === value.toLowerCase()}
				<button
					type="button"
					role="option"
					aria-selected={sel}
					aria-label={c}
					tabindex={i === swatchFocusIndex ? 0 : -1}
					{disabled}
					class={swatchClass}
					style={`background:${c};`}
					data-selected={sel ? '' : undefined}
					onclick={() => {
						swatchFocusIndex = i;
						pick(c);
					}}
					onfocus={() => (swatchFocusIndex = i)}
				></button>
			{/each}
		</div>
	{/if}
</div>
