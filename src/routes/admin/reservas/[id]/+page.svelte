<script lang="ts">
    export let data;
    const r = data.reserva;

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString("es-EC", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
</script>

<div class="space-y-8">

    <!-- Título -->
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Reserva #{r.id}
    </h1>

    <!-- Tarjeta estilo Power BI -->
    <div class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 space-y-4">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {r.nombre_cliente}
                </p>
            </div>

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {r.email_cliente}
                </p>
            </div>

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Tour</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {r.tour.nombre}
                </p>
            </div>

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Personas</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {r.numero_personas}
                </p>
            </div>

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Fecha de reserva</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(r.fecha_reserva)}
                </p>
            </div>

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Estado</p>

                {#if r.estado.estado === "PAGADA"}
                    <span class="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                        Pagada
                    </span>
                {:else if r.estado.estado === "PENDIENTE"}
                    <span class="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                        Pendiente
                    </span>
                {:else}
                    <span class="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                        Cancelada
                    </span>
                {/if}
            </div>

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Registrado por</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {r.usuario.nombre} {r.usuario.apellido}
                </p>
            </div>

        </div>

        <!-- Botón volver -->
        <div class="pt-6">
            <a
                href="/admin/reservas"
                class="inline-block rounded-xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
            >
                Volver
            </a>
        </div>

    </div>
</div>
