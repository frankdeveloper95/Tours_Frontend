<script lang="ts">
    export let data;


    // Normalizamos tours y forzamos is_active a booleano
    const tours = (data.tours ?? []).map(t => ({
        ...t,
        is_active: Boolean(t.is_active)
    }));


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
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500 dark:text-gray-400">Tours activos</p>
            <p class="mt-2 text-3xl font-bold text-primary-600">
                {tours.filter(t => t.is_active).length}
            </p>
        </div>

        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500 dark:text-gray-400">Tours inactivos</p>
            <p class="mt-2 text-3xl font-bold text-red-500">
                {tours.filter(t => !t.is_active).length}
            </p>
        </div>

        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total tours</p>
            <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {tours.length}
            </p>
        </div>
    </div>

    <!-- 🔶 Tabla profesional -->
    <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div class="mb-6 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Gestión de tours</h2>

            <a
                href="/admin/tours/create"
                class="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
            >
                Crear nuevo tour
            </a>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead class="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nombre</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Fecha</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Precio</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Estado</th>
                        <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Acciones</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    {#each tours as tour}
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                            <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                {tour.nombre}
                            </td>

                            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {formatDate(tour.fecha)}
                            </td>

                            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                ${tour.precio}
                            </td>

                            <td class="px-4 py-3">
                                {#if tour.is_active}
                                    <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                        Activo
                                    </span>
                                {:else}
                                    <span class="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                        Inactivo
                                    </span>
                                {/if}
                            </td>

                            <td class="px-4 py-3 text-right space-x-2">

                                <!-- Editar -->
                                <a
                                    href={`/admin/tours/${tour.id}/edit`}
                                    class="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                                >
                                    Editar
                                </a>

                                <!-- Activar / Desactivar -->
                                {#if tour.is_active}
                                    <form method="post" action="?/deactivate" class="inline">
                                        <input type="hidden" name="id" value={tour.id} />
                                        <button
                                            class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
                                        >
                                            Desactivar
                                        </button>
                                    </form>
                                {:else}
                                    <form method="post" action="?/activate" class="inline">
                                        <input type="hidden" name="id" value={tour.id} />
                                        <button
                                            class="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-700"
                                        >
                                            Activar
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
