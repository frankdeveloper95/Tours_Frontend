<script>
    export let data;
    const reservas = data.reservas;
</script>

<h1 class="text-3xl font-bold mb-6">Reservas del Usuario</h1>

{#if reservas.length === 0}
    <p>No tiene reservas registradas.</p>
{:else}
    <ul class="space-y-4">
        {#each reservas as r}
            <li class="p-4 bg-white shadow rounded">
                <p><strong>Tour:</strong> {r.tour.nombre}</p>
                <p><strong>Fecha:</strong> {new Date(r.fecha_reserva).toLocaleDateString()}</p>
                <p><strong>Personas:</strong> {r.numero_personas}</p>
                <p><strong>Estado:</strong> {r.estado.estado}</p>
            </li>
        {/each}
    </ul>
{/if}
