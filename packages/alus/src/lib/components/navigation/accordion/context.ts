import { getContext, setContext } from 'svelte';

export type AccordionType = 'single' | 'multiple';

export interface AccordionRootContext {
	type: () => AccordionType;
	value: () => string[];
	toggle: (v: string) => void;
	isOpen: (v: string) => boolean;
	collapsible: () => boolean;
	baseId: string;
	disabled: () => boolean;
}

export interface AccordionItemContext {
	readonly value: string;
	disabled: () => boolean;
	open: () => boolean;
	readonly triggerId: string;
	readonly contentId: string;
}

const ROOT = Symbol('alus-ui-accordion-root');
const ITEM = Symbol('alus-ui-accordion-item');

export function setAccordionRoot(ctx: AccordionRootContext) {
	setContext(ROOT, ctx);
}
export function getAccordionRoot(): AccordionRootContext {
	const ctx = getContext<AccordionRootContext>(ROOT);
	if (!ctx) throw new Error('Accordion subcomponents must be inside <Accordion>');
	return ctx;
}
export function setAccordionItem(ctx: AccordionItemContext) {
	setContext(ITEM, ctx);
}
export function getAccordionItem(): AccordionItemContext {
	const ctx = getContext<AccordionItemContext>(ITEM);
	if (!ctx) throw new Error('AccordionTrigger/Content must be inside <AccordionItem>');
	return ctx;
}
