import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import fs from "fs";

export default defineConfig({
	server: {
		// origin: 'http://localhost:8000'
		host: '0.0.0.0'
	},
	plugins: [tailwindcss(), sveltekit()]
});
