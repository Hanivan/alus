import { sveltekit } from '@sveltejs/kit/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		expect: { requireAssertions: true },
		include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [{ browser: 'chromium', headless: true }]
		}
	}
});
