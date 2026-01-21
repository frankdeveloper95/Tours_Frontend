<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
	import { Button, Card } from 'flowbite-svelte';
	const { data } = $props();

	function reservar(id: number) {
		location.href = `/protected/checkout?tourId=${id}`;
	}

	const FALLBACK_IMG = 'https://via.placeholder.com/1200x800?text=Tour';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="mx-auto w-full max-w-7xl px-4 py-6">
	<div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Tours disponibles
			</h1>
			<p class="text-sm text-gray-600 dark:text-gray-300">Explora experiencias y reserva rápido.</p>
		</div>

		<div
			class="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
		>
			{data?.tours?.length ?? 0} tour(s)
		</div>
	</div>

	{#if !data?.tours || data.tours.length === 0}
		<div
			class="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900/40"
		>
			<h2 class="text-lg font-semibold text-gray-900 dark:text-white">No hay tours para mostrar</h2>
			<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
				Si esto es inesperado, revisa que tu endpoint esté devolviendo la lista.
			</p>
		</div>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.tours as tour (tour.id)}
				<Card
					class="overflow-hidden rounded-3xl border border-gray-200 p-0 shadow-sm dark:border-gray-800"
				>
					<a href={`/tour/${tour.id}`} class="relative block">
						<img
							class="h-56 w-full object-cover"
							src={`${PUBLIC_HOST}/public${tour.image_url}`}
							alt={tour.nombre}
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
						></div>
						<div class="absolute right-3 bottom-3 left-3">
							<h3 class="truncate text-lg font-semibold text-white">{tour.nombre}</h3>
							<p class="truncate text-xs text-white/80">
								{tour.destino ?? 'Ver detalles del tour'}
							</p>
						</div>
					</a>

					<div class="space-y-4 p-5">
						<div class="flex items-center justify-between">
							<span class="text-xl font-bold text-gray-900 dark:text-white"
								>{`\$${tour.precio}`}</span
							>

							<span class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
								<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
								Disponible
							</span>
						</div>

						<div class="flex gap-3">
							<Button
								class="w-full rounded-2xl"
								type="button"
								onclick={() => reservar(tour.id)}
							>
								Reservar
							</Button>

							<a
								href={`/tour/${tour.id}`}
								class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
							>
								Detalles
							</a>
						</div>


						<p class="text-xs text-gray-500 dark:text-gray-400">
							* Te llevará al checkout para completar la reserva.
						</p>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
