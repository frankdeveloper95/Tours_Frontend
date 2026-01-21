<script lang="ts">
    export let data;
    const reservas = data.reservas ?? [];

    // ⭐ Filtro de estado
    let filtro = "TODOS";

    // ⭐ Lista filtrada reactiva
    $: reservasFiltradas =
        filtro === "TODOS"
            ? reservas
            : reservas.filter(r => r.estado.estado === filtro);

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString("es-EC", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
</script>

<div class="space-y-8">

    <!-- 🔶 Tarjetas tipo Power BI -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">

        <!-- Pendientes -->
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
            <p class="mt-2 text-3xl font-bold text-yellow-500">
                {reservas.filter(r => r.estado.estado === "PENDIENTE").length}
            </p>
        </div>

        <!-- Pagadas -->
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500 dark:text-gray-400">Pagadas</p>
            <p class="mt-2 text-3xl font-bold text-green-600">
                {reservas.filter(r => r.estado.estado === "PAGADA").length}
            </p>
        </div>

        <!-- Total -->
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total reservas</p>
            <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {reservas.length}
            </p>
        </div>
    </div>

    <!-- 🔶 Tabla profesional estilo Power BI -->
    <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

        <div class="mb-6 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Gestión de reservas</h2>
        </div>

        <!-- ⭐ Filtro -->
        <div class="mb-4 flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filtrar por estado:
            </label>

            <select
                bind:value={filtro}
                class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
                <option value="TODOS">Todos</option>
                <option value="PENDIENTE">Pendientes</option>
                <option value="PAGADA">Pagadas</option>
                <option value="CANCELADA">Canceladas</option>
            </select>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead class="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Cliente</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Tour</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Personas</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Fecha</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Estado</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Usuario</th>
                        <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Acciones</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    {#each reservasFiltradas as r}
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/40">

                            <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                {r.nombre_cliente}
                            </td>

                            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {r.tour.nombre}
                            </td>

                            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {r.numero_personas}
                            </td>

                            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {formatDate(r.fecha_reserva)}
                            </td>

                            <td class="px-4 py-3">
                                {#if r.estado.estado === "PAGADA"}
                                    <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                        Pagada
                                    </span>
                                {:else if r.estado.estado === "PENDIENTE"}
                                    <span class="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                                        Pendiente
                                    </span>
                                {:else}
                                    <span class="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                        Cancelada
                                    </span>
                                {/if}
                            </td>

                            <td class="px-4 py-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                <a href={`/admin/usuarios/${r.usuario.id}/reservas`}>
                                    {r.usuario.nombre} {r.usuario.apellido}
                                </a>
                            </td>

                            <td class="px-4 py-3 text-right space-x-2">

                                <!-- Ver -->
                                <a
                                    href={`/admin/reservas/${r.id}`}
                                    class="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                                >
                                    Ver
                                </a>

                                <!-- Pagar (solo si está pendiente) -->
                                {#if r.estado.estado === "PENDIENTE"}
                                    <form method="post" action="?/pagar" class="inline">
                                        <input type="hidden" name="id" value={r.id} />
                                        <button
                                            class="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-700"
                                        >
                                            Pagar
                                        </button>
                                    </form>
                                {/if}

                                <!-- Cancelar (si NO está cancelada) -->
                                {#if r.estado.estado !== "CANCELADA"}
                                    <form method="post" action="?/cancel" class="inline">
                                        <input type="hidden" name="id" value={r.id} />
                                        <button
                                            class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
                                        >
                                            Cancelar
                                        </button>
                                    </form>
                                {/if}

                            </td>

                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
