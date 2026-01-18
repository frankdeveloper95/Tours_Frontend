<script lang="ts">
	const { data } = $props();
</script>

<svelte:head>
	<title>Tours</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl p-4 text-slate-900 dark:text-white">
	<div class="mb-4">
		<h1 class="text-2xl font-bold">Tours</h1>
		<p class="text-sm text-slate-600 dark:text-white/60">Selecciona un tour para ver detalles.</p>

		<!-- TEMP: si no carga, esto te dirá el motivo -->
		{#if data?.debug?.status && data.debug.status !== 200}
			<p class="mt-2 text-xs text-red-400">
				Error {data.debug.status} → {data.debug.url}
			</p>
		{/if}
	</div>

	{#if !data.tours || data.tours.length === 0}
		<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
			<p class="text-sm text-slate-700 dark:text-white/70">No hay tours disponibles.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.tours as t}
				<a
					href={`/tour/${t.id}`}
					class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900"
				>
					<div class="text-lg font-bold group-hover:underline">
						{t.nombre ?? 'Tour'}
					</div>

					<p class="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-white/60">
						{t.descripcion ?? ''}
					</p>

					<div class="mt-4 flex items-center justify-between">
						<span class="text-sm font-semibold">${t.precio ?? '-'}</span>
						<span class="text-xs text-slate-500 dark:text-white/50">Ver detalles →</span>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
