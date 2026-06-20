<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet<
			[
				{
					page: number;
					totalPages: number;
					pages: (number | 'ellipsis')[];
					goto: (p: number) => void;
					prev: () => void;
					next: () => void;
					canPrev: boolean;
					canNext: boolean;
					isCurrentPage: (p: number) => boolean;
				}
			]
		>;
		page?: number;
		total: number;
		perPage?: number;
		siblingCount?: number;
		class?: string;
		'aria-label'?: string;
		onPageChange?: (p: number) => void;
	}

	let {
		children,
		page = $bindable(1),
		total,
		perPage = 10,
		siblingCount = 1,
		class: className = '',
		'aria-label': ariaLabel = 'Pagination',
		onPageChange
	}: Props = $props();

	let totalPages = $derived(Math.max(1, Math.ceil(total / perPage)));

	function clamp(p: number) {
		return Math.max(1, Math.min(totalPages, p));
	}

	function goto(p: number) {
		const next = clamp(p);
		if (next === page) return;
		page = next;
		onPageChange?.(next);
	}

	function prev() {
		goto(page - 1);
	}
	function next() {
		goto(page + 1);
	}

	let canPrev = $derived(page > 1);
	let canNext = $derived(page < totalPages);

	let pages: (number | 'ellipsis')[] = $derived.by(() => {
		const result: (number | 'ellipsis')[] = [];
		const range = (start: number, end: number) => {
			for (let i = start; i <= end; i++) result.push(i);
		};
		const minVisible = siblingCount * 2 + 5;
		if (totalPages <= minVisible) {
			range(1, totalPages);
			return result;
		}
		const left = Math.max(2, page - siblingCount);
		const right = Math.min(totalPages - 1, page + siblingCount);
		result.push(1);
		if (left > 2) result.push('ellipsis');
		range(left, right);
		if (right < totalPages - 1) result.push('ellipsis');
		result.push(totalPages);
		return result;
	});
</script>

<nav class={className} aria-label={ariaLabel}>
	{#if children}
		{@render children({
			page,
			totalPages,
			pages,
			goto,
			prev,
			next,
			canPrev,
			canNext,
			isCurrentPage: (p) => p === page
		})}
	{/if}
</nav>
