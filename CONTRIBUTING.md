# Contributing to Alus

Thank you for your interest in contributing to Alus! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8
- Git

### Setup Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/Hanivan/alus.git
   cd alus-svelte
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development servers**
   ```bash
   pnpm dev
   ```
   This starts both the library watcher and showcase application.

## 📋 Development Workflow

### 1. Choose What to Work On

- Check [Component Roadmap](docs/todos/ui-components-roadmap.md) for planned components
- Look at [GitHub Issues](https://github.com/Hanivan/alus/issues) for specific tasks
- Start with good first issues if you're new

### 2. Create a Branch

```bash
git checkout -b feature/your-component-name
# or
git checkout -b fix/issue-description
```

### 3. Implement Your Changes

#### Adding a New Component

1. **Create component structure** in `packages/alus/src/lib/components/`
   ```
   components/
   └── form/          # or feedback/, navigation/, etc.
       └── yourcomponent/
           ├── YourComponent.svelte
           └── index.ts
   ```

2. **Follow component template**
   ```svelte
   <script lang="ts">
   	import type { HTMLAttributes } from 'svelte/elements';

   	interface Props {
   		// Define your props here
   		class?: string;
   	}

   	let { class: className = '', ...rest }: Props = $props();
   </script>

   <!-- Unstyled, semantic HTML -->
  <div class={className} {...rest}>
   	<!-- Your content -->
   </div>
   ```

3. **Export from index files**
   - Update `packages/alus/src/lib/components/yourcomponent/index.ts`
   - Update `packages/alus/src/lib/components/index.ts`

4. **Add usage examples** in showcase app
   - Add examples to `src/routes/+page.svelte` or create new route

#### Component Requirements

All components must be:
- ✅ **Unstyled** - No default colors, spacing, or styling assumptions
- ✅ **Accessible** - WCAG 2.1 AA compliant with proper ARIA
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Keyboard-friendly** - Complete keyboard navigation
- ✅ **Screen reader support** - Proper labels and announcements
- ✅ **Svelte 5 runes** - Use `$props`, `$derived`, `$state`

### 4. Test Your Changes

```bash
# Type checking
pnpm check

# Run tests
pnpm test

# Linting
pnpm lint

# Format code
pnpm format
```

### 5. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add Checkbox component"
git commit -m "fix: correct aria-label on Button"
git commit -m "docs: update README with new examples"
```

### 6. Create Pull Request

1. Push your branch to GitHub
2. Create a pull request with:
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes
   - Usage examples

## 📝 Coding Standards

### TypeScript

- Use strict type checking
- Define interfaces for component props
- Export types for public APIs
- Use proper type imports

```typescript
// Good
import type { HTMLAttributes } from 'svelte/elements';
interface Props {
	disabled?: boolean;
	class?: string;
}

// Bad
let disabled: boolean | undefined = $props();
```

### Svelte 5 Runes

Always use Svelte 5 runes syntax:

```svelte
<script lang="ts">
// Good - runes
let { count = 0 }: Props = $props();
let doubled = $derived(count * 2);
let message = $state('hello');

// Bad - legacy
export let count = 0;
$: doubled = count * 2;
```

### Accessibility

Every component must include:

1. **Semantic HTML** - Use proper elements
2. **ARIA attributes** - aria-label, aria-describedby, etc.
3. **Keyboard support** - Enter, Space, Escape, Arrow keys
4. **Focus management** - Visible focus indicators
5. **Screen reader support** - Labels and announcements

```svelte
<!-- Good -->
<button
	aria-label="Close dialog"
	aria-pressed={pressed}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			// Handle activation
		}
	}}
>
	Close
</button>
```

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Keep components focused and simple
- Write clear, self-documenting code
- Add comments for complex logic

## 🧪 Testing

### Unit Tests

Create tests alongside components:

```typescript
// YourComponent.svelte.spec.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import YourComponent from './YourComponent.svelte';

describe('YourComponent', () => {
	it('renders correctly', () => {
		const { getByRole } = render(YourComponent);
		expect(getByRole('button')).toBeTruthy();
	});
});
```

### Accessibility Tests

Test keyboard navigation and screen reader support:

```typescript
it('handles keyboard interaction', () => {
	const { getByRole } = render(YourComponent);
	const button = getByRole('button');

	button.focus();
	expect(document.activeElement).toBe(button);

	// Test keyboard interaction
	fireEvent.keyDown(button, { key: 'Enter' });
	// Assert behavior
});
```

## 📖 Documentation

### Component Documentation

Each component should have:

1. **Usage examples** in showcase app
2. **Props documentation** in component file or README
3. **Accessibility notes** if complex behavior
4. **TypeScript types** exported for users

```svelte
<!--
	Checkbox

	Accessible checkbox component with keyboard support.

	Props:
	- checked: boolean - Current checked state
	- disabled: boolean - Disable the checkbox
	- aria-label: string - Accessibility label

	Events:
	- change: Dispatched when value changes

	Usage:
	<Checkbox bind:checked={value} />
-->
```

## 🎨 Design Principles

### Unstyled Philosophy

- **No default colors** - Let users control appearance
- **No layout assumptions** - Don't force responsive behavior
- **Utility-friendly** - Works with Tailwind, CSS-in-JS, plain CSS
- **Theme-agnostic** - Support light/dark mode via CSS variables

### Accessibility First

- **Keyboard navigation** - All features accessible via keyboard
- **Screen readers** - Proper ARIA and semantic HTML
- **Focus indicators** - Visible focus states
- **Error handling** - Clear error messages and states
- **WCAG 2.1 AA** - Meet accessibility standards

## 🐛 Reporting Issues

When reporting bugs:

1. **Search existing issues** first
2. **Use issue templates** if available
3. **Provide reproduction** - Code snippet or reproduction link
4. **Describe expected vs actual** behavior
5. **Include environment info** - Browser, OS, Svelte version

## 💬 Discussion

For questions and discussions:

- Start a [GitHub Discussion](https://github.com/Hanivan/alus/discussions)
- Join our community chat (if available)
- Check existing documentation first

## 📜 Code of Conduct

Be respectful, inclusive, and constructive:
- Respect differing opinions
- Provide constructive feedback
- Accept feedback gracefully
- Focus on what's best for the community

## 🎉 Recognition

Contributors will be:
- Listed in contributors section
- Credited in release notes
- Acknowledged in significant contributions

Thank you for contributing to Alus! 🙏

## 📚 Additional Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Component Roadmap](docs/todos/ui-components-roadmap.md)
- [Project CLAUDE.md](CLAUDE.md)
