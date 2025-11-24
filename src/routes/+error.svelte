<script lang="ts">
	import { page } from '$app/state';
	import { Section, Page404, Page500 } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
</script>

{#if page.status === 500}
	<Section name="page500" class="flex min-h-screen items-center justify-center">
		<Page500>
			{#snippet h1()}500{/snippet}
			{#snippet paragraph()}
				<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
					Error Interno del Servidor.
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					Estamos trabajando para resolver el problema.
				</p>
			{/snippet}
		</Page500>
	</Section>
{:else}
	<Section name="page404" class="flex min-h-screen items-center justify-center">
		<Page404>
			{#snippet h1()}
				404
			{/snippet}
			{#snippet paragraph()}
				<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
					Algo anda mal.
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					Lo sentimos, no podemos encontrar esa página. Encontrarás muchas cosas que explorar en la
					página de inicio.
				</p>
				<Button href="/" size="lg" color="red">Volver a la página de inicio</Button>
			{/snippet}
		</Page404>
	</Section>
{/if}
