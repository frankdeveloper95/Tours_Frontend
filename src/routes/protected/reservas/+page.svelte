<script lang="ts">
	const { data } = $props<{
		data: {
			reservas: Array<{
				tour: {
					nombre: string;
				};
			}>;
		};
	}>();
</script>

<svelte:head>
	<title>Reservas</title>
</svelte:head>

{#if data.reservas.length === 0}
	<div class="flex min-h-full items-center justify-center">
		<h1 class="text-xl dark:text-white">No tienes reservas aún.</h1>
	</div>
{:else}
	<div class="font-bold dark:text-white">Mis Reservas</div>

	{#each data.reservas as reserva}
		<span class="dark:text-white">{reserva.tour.nombre}</span>
	{/each}
{/if}
