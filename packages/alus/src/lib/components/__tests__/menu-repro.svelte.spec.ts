import { page } from 'vitest/browser';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MenuEachFixture from './MenuEachFixture.svelte';

it('menu with {#each} items opens and selects without an effect loop', async () => {
	const errors: unknown[] = [];
	const onErr = (e: ErrorEvent) => errors.push(e.message);
	window.addEventListener('error', onErr);
	try {
		render(MenuEachFixture, { open: true });
		await expect.element(page.getByTestId('item-B')).toBeInTheDocument();
		(await page.getByTestId('item-B').element()).dispatchEvent(
			new MouseEvent('click', { bubbles: true })
		);
		await expect.element(page.getByTestId('last')).toHaveTextContent('B');
	} finally {
		window.removeEventListener('error', onErr);
	}
	expect(errors).toEqual([]);
});

it('arrow navigation skips an item disabled after mount', async () => {
	render(MenuEachFixture, { open: true });
	await expect.element(page.getByTestId('item-A')).toBeInTheDocument();
	(await page.getByTestId('toggle-b').element()).dispatchEvent(
		new MouseEvent('click', { bubbles: true })
	);
	const a = await page.getByTestId('item-A').element();
	a.dispatchEvent(new PointerEvent('pointerenter'));
	a.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
	await expect.poll(() => document.activeElement?.getAttribute('data-testid')).toBe('item-C');
});

it('re-enabling an item keeps it in its original position', async () => {
	render(MenuEachFixture, { open: true, initialDisabled: 'B' });
	await expect.element(page.getByTestId('item-A')).toBeInTheDocument();
	(await page.getByTestId('toggle-b').element()).dispatchEvent(
		new MouseEvent('click', { bubbles: true })
	);
	const a = await page.getByTestId('item-A').element();
	a.dispatchEvent(new PointerEvent('pointerenter'));
	a.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
	await expect.poll(() => document.activeElement?.getAttribute('data-testid')).toBe('item-B');
});
