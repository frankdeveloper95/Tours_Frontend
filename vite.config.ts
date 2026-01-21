import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import fs from "fs";

export default defineConfig({
	server: {
		// origin: 'http://localhost:8000'
		https: {
			cert: fs.readFileSync('/home/frank/Documents/tours_proyecto/Tours_Backend/pptours.com+1.pem'),
			key: fs.readFileSync('/home/frank/Documents/tours_proyecto/Tours_Backend/pptours.com+1-key.pem')
		},
		host: '0.0.0.0'
	},
	plugins: [tailwindcss(), sveltekit()]
});
