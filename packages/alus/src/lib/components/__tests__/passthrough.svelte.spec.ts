import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Button } from '$components/form/button/index.js';
import { Input } from '$components/form/input/index.js';
import { Switch } from '$components/form/switch/index.js';
import { ColorPicker } from '$components/form/color-picker/index.js';
import { Calendar } from '$components/form/calendar/index.js';
import ModalFixture from './ModalFixture.svelte';

describe('HTML attribute passthrough', () => {
	it('forwards arbitrary data-* attributes to the host element', async () => {
		render(Button, { 'data-testid': 'probe' });
		await expect.element(page.getByTestId('probe')).toBeInTheDocument();
	});

	it('forwards previously undeclared event handlers', async () => {
		const onblur = vi.fn();
		const oncontextmenu = vi.fn();
		render(Button, { 'data-testid': 'evt', onblur, oncontextmenu });

		const el = page.getByTestId('evt');
		(await el.element()).dispatchEvent(new FocusEvent('blur'));
		(await el.element()).dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));

		expect(onblur).toHaveBeenCalledOnce();
		expect(oncontextmenu).toHaveBeenCalledOnce();
	});

	it('forwards native attributes that were never declared as props', async () => {
		render(Button, { 'data-testid': 'attrs', id: 'the-id', name: 'the-name' });
		const el = await page.getByTestId('attrs').element();
		expect(el.id).toBe('the-id');
		expect(el.getAttribute('name')).toBe('the-name');
	});

	it('forwards a declared prop whose value the consumer overrides', async () => {
		render(Button, { 'data-testid': 'own', type: 'submit' });
		expect((await page.getByTestId('own').element()).getAttribute('type')).toBe('submit');
	});

	// `aria-disabled` is the only key here reachable through both `rest` and `ariaAttrs`:
	// `interactiveStateAttrs` always emits it from the component-owned `disabled`, and it is
	// not redeclared in Button's Props, so a consumer's value travels in `rest`. That makes
	// this the only assertion in this file that fails if the two spreads invert.
	it('keeps component-owned ARIA attributes winning over consumer input', async () => {
		render(Button, { 'data-testid': 'aria-own', disabled: true, 'aria-disabled': 'false' });
		const el = await page.getByTestId('aria-own').element();
		expect(el.getAttribute('aria-disabled')).toBe('true');
	});

	it('forwards ARIA props through the helper pipeline', async () => {
		render(Button, {
			'data-testid': 'aria-helpers',
			'aria-pressed': 'true',
			'aria-label': 'Toggle'
		});
		const el = await page.getByTestId('aria-helpers').element();
		expect(el.getAttribute('aria-pressed')).toBe('true');
		expect(el.getAttribute('aria-label')).toBe('Toggle');
	});

	it('keeps value bound to the host input', async () => {
		render(Input, { 'data-testid': 'val', value: 'hello' });
		expect(((await page.getByTestId('val').element()) as HTMLInputElement).value).toBe('hello');
	});

	// The `[type='text']` CSS in this repo (src/routes/layout.css) depends on the attribute
	// actually being present, which is why `type = 'text'` stays destructured rather than
	// being left to the native default. This asserts the reason the prop was kept.
	it("renders Input's default type as an explicit attribute", async () => {
		render(Input, { 'data-testid': 'default-type' });
		const el = await page.getByTestId('default-type').element();
		expect(el.hasAttribute('type')).toBe(true);
		expect(el.getAttribute('type')).toBe('text');
	});

	it('omits an aria-* attribute passed as null rather than rendering "null"', async () => {
		render(Input, { 'data-testid': 'null-aria', 'aria-label': null });
		const el = await page.getByTestId('null-aria').element();
		expect(el.hasAttribute('aria-label')).toBe(false);
	});

	it('forwards native attributes and handlers through rest on Input', async () => {
		const onblur = vi.fn();
		render(Input, { 'data-testid': 'input', onblur, min: 5, max: 10 });
		const el = await page.getByTestId('input').element();
		expect(el.getAttribute('min')).toBe('5');
		expect(el.getAttribute('max')).toBe('10');
		el.dispatchEvent(new FocusEvent('blur'));
		expect(onblur).toHaveBeenCalledOnce();
	});
});

describe('Switch handler rename', () => {
	it('fires onCheckedChange with a boolean', async () => {
		const onCheckedChange = vi.fn();
		render(Switch, { 'data-testid': 'sw', onCheckedChange });
		// `.element()` is typed `HTMLElement | SVGElement`, so `.click()` is a type error on the
		// union. Cast to `HTMLElement` — every host in this library is one.
		((await page.getByTestId('sw').element()) as HTMLElement).click();
		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	it('also forwards the native change event through rest', async () => {
		const onchange = vi.fn();
		render(Switch, { 'data-testid': 'sw2', onchange });
		const el = await page.getByTestId('sw2').element();
		el.dispatchEvent(new Event('change', { bubbles: true }));
		expect(onchange).toHaveBeenCalledOnce();
	});
});

describe('semantic callback renames', () => {
	it('ColorPicker fires onValueChange with a string', async () => {
		const onValueChange = vi.fn();
		// `showNative: false` leaves exactly one textbox in the tree, so the unscoped
		// `getByRole` resolves. Chained locators (`getByTestId(..).getByRole(..)`) do NOT
		// resolve in this harness — verified 2026-09-20.
		render(ColorPicker, { 'data-testid': 'cp', onValueChange, showNative: false });
		await page.getByRole('textbox').fill('#ff0000');
		expect(onValueChange).toHaveBeenCalled();
		expect(typeof onValueChange.mock.calls[0][0]).toBe('string');
	});

	it('ColorPicker still receives a native onchange through rest', async () => {
		const onchange = vi.fn();
		render(ColorPicker, { 'data-testid': 'cp2', onchange, showNative: false });
		const input = await page.getByRole('textbox').element();
		await page.getByRole('textbox').fill('#00ff00');
		input.dispatchEvent(new Event('change', { bubbles: true }));
		expect(onchange).toHaveBeenCalled();
	});

	it('Calendar fires onValueChange with a DateValue', async () => {
		const onValueChange = vi.fn();
		render(Calendar, { 'data-testid': 'cal', onValueChange });
		// The clickable element is the `<button>` INSIDE the gridcell, not the gridcell
		// itself. Clicking the gridcell div fires nothing — verified 2026-09-20.
		const cell = await page.getByRole('gridcell').first().element();
		(cell.querySelector('button') as HTMLButtonElement).click();
		expect(onValueChange).toHaveBeenCalled();
	});
});

describe('inner-node passthrough', () => {
	it('puts data-* on the content node, not the Portal wrapper', async () => {
		render(ModalFixture, {});

		// Locate by role, not by testid: `getByTestId` is what we are asserting, and a
		// `getByTestId` locator that cannot resolve waits out its full timeout (15s) before
		// failing, instead of failing fast. `getByRole('dialog')` resolves before the fix too
		// — verified 2026-09-21 — so the assertion below is the only thing that changes.
		const content = await page.getByRole('dialog').element();

		// The consumer's data-* must reach the content node. Pre-fix this is false; it is
		// false because ModalContent spreads nothing, which is the defect being fixed.
		expect(content.getAttribute('data-testid')).toBe('modal-content');
		// The fixture passes role="alertdialog"; ModalContent hardcodes role="dialog". The
		// component's own value must win, which proves `{...rest}` is spread FIRST. If the
		// fixture ever stops passing a conflicting role this assertion goes inert.
		expect(content.getAttribute('role')).toBe('dialog');
	});
});
