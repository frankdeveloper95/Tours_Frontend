<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	async function checkout(id: number) {
		const token = data.access_token;
		const res = await fetch('http://localhost:8000/api/v1/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				product_id: id
			})
		});
		const url = await res.json();
		if (url) {
			window.location.href = url.url;
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="flex flex-wrap justify-center gap-4">
	{#each data.tours as tour}
		<Card class="p-0">
			<img
				class="h-64 rounded-t-lg bg-cover p-8"
				src={`http://localhost:8000/public${tour.image_url}`}
				alt={tour.nombre}
			/>
			<div class="px-5 pb-5">
				<a href="/tour/{tour.id}">
					<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
						{tour.nombre}
					</h5>
				</a>
				<div class="flex items-center justify-between">
					<span class="text-3xl font-bold text-gray-900 dark:text-white">{`\$${tour.precio}`}</span>
					<Button
						onclick={(e: Event) => {
							e.preventDefault();
							checkout(tour.id);
						}}
						type="button">Reservar</Button
					>
				</div>
			</div>
		</Card>
	{/each}
</div>
