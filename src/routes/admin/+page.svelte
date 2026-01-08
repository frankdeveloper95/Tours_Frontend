<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<section class="px-6 py-6 text-slate-900 dark:text-white">
	<h1 class="mb-4 text-3xl font-bold">Panel de Administración</h1>

	<p class="text-slate-600 dark:text-white/70">
		Bienvenido al panel administrativo. Desde aquí podrás gestionar tours,
		usuarios, reservas y visualizar estadísticas del sistema.
	</p>
</section>
