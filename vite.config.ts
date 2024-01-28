import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
	plugins: [sveltekit(), wasm()],
	worker: {
		// Not needed with vite-plugin-top-level-await >= 1.3.0
		// format: "es",
		plugins: [wasm(), topLevelAwait()]
	},
	assetsInclude: ["**/*.wasm"],
});
