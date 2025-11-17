<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { DarkMode } from 'flowbite-svelte';
	import '../app.css';
	import Sidebar from '../components/sidebar.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<DarkMode
	class="fixed top-2 right-2 z-50 border text-primary-500 dark:border-gray-800 dark:text-primary-600"
/>
{#if data.user}
	<Sidebar>
		{@render children()}
	</Sidebar>
{:else}
	{@render children()}
{/if}
