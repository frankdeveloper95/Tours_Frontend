<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Reservas</title>
</svelte:head>

{#if !data.reservas}
	<div class="flex min-h-full items-center justify-center">
		<h1 class="text-xl dark:text-white">No tienes reservas aún.</h1>
	</div>
{:else}
	<div class="font-bold dark:text-white">Mis Reservas</div>
	{#each data.reservas as reserva }
		<span class="text-white">{reserva.tour.nombre}</span>
	{/each}
		
{/if}
