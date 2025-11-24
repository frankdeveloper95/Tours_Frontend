import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		origin: 'http://localhost:8000'
	},
	plugins: [tailwindcss(), sveltekit()]
});
