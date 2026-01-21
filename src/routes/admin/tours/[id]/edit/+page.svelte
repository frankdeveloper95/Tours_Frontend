<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let data;
	const tour = data.tour;
</script>

<div class="space-y-8">
	<!-- 🔷 Tarjeta resumen del tour -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
		<div
			class="rounded-3xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900"
		>
			<p class="text-sm text-gray-500 dark:text-gray-400">ID del tour</p>
			<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{tour.id}</p>
		</div>

		<div
			class="rounded-3xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900"
		>
			<p class="text-sm text-gray-500 dark:text-gray-400">Estado</p>
			{#if tour.is_active}
				<span
					class="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300"
				>
					Activo
				</span>
			{:else}
				<span
					class="mt-2 inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300"
				>
					Inactivo
				</span>
			{/if}
		</div>
	</div>

	<!-- 🔷 Formulario visual -->
	<form
		method="POST"
		action="?/update"
		class="grid grid-cols-1 gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-md sm:grid-cols-2 dark:border-gray-800 dark:bg-gray-900"
	>
		<!-- Nombre -->
		<div>
			<label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Nombre</label
			>
			<input
				type="text"
				name="nombre"
				id="nombre"
				value={tour.nombre}
				class="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
				required
			/>
		</div>

		<!-- Precio -->
		<div>
			<label for="precio" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Precio</label
			>
			<input
				type="number"
				name="precio"
				id="precio"
				value={tour.precio}
				step="0.01"
				class="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
				required
			/>
		</div>

		<!-- Fecha -->
		<div>
			<label for="fecha" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Fecha</label
			>
			<input
				type="date"
				name="fecha"
				id="fecha"
				value={tour.fecha?.slice(0, 10)}
				class="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
				required
			/>
		</div>

		<!-- Estado -->
		<div>
			<label for="is_active" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Estado</label
			>
			<select
				name="is_active"
				id="is_active"
				class="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
			>
				<option value="true" selected={tour.is_active}>Activo</option>
				<option value="false" selected={!tour.is_active}>Inactivo</option>
			</select>
		</div>

		<!-- Botón -->
		<div class="pt-4 sm:col-span-2">
			<button
				type="submit"
				class="w-full rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-primary-700"
			>
				💾 Guardar cambios
			</button>
		</div>
	</form>
</div>
