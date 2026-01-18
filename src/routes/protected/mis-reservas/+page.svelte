<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Mis Reservas</title>
</svelte:head>

<div class="mx-auto w-full max-w-5xl p-4 text-slate-900 dark:text-white">
	<div class="mb-4">
		<h1 class="text-2xl font-bold">Mis reservas</h1>
		<p class="text-sm text-slate-600 dark:text-white/60">
			Aquí se muestran tus reservas registradas.
		</p>
	</div>

	{#if !data.reservas || data.reservas.length === 0}
		<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
			<p class="text-sm text-slate-700 dark:text-white/70">Aún no tienes reservas.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each data.reservas as r}
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
					<div class="flex items-start justify-between gap-3">
						<div>
							<div class="text-xs font-semibold text-slate-500 dark:text-white/50">
								Reserva #{r.id}
							</div>
							<div class="text-lg font-bold">{r.tour_nombre ?? 'Tour'}</div>
							<div class="mt-1 text-sm text-slate-600 dark:text-white/60">
								{r.fecha ?? ''} {r.hora ?? ''}
							</div>
						</div>

						<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-white/80">
							{r.estado_reserva ?? 'Pendiente'}
						</span>
					</div>

					<div class="mt-3 text-sm text-slate-700 dark:text-white/70">
						<div><span class="font-semibold">Personas:</span> {r.cantidad_personas ?? '-'}</div>
						<div><span class="font-semibold">Total:</span> ${r.total ?? '-'}</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
