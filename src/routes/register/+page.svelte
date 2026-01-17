<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import type { PageProps } from './$types';

	import RegisterProgress from '$lib/features/auth/components/RegisterProgress.svelte';
	import RegisterStep1 from '$lib/features/auth/components/RegisterStep1.svelte';
	import RegisterStep2 from '$lib/features/auth/components/RegisterStep2.svelte';
	import RegisterStep3 from '$lib/features/auth/components/RegisterStep3.svelte';

	import { validateStep } from '$lib/features/auth/register/register.client';

	let { form }: PageProps = $props();

	const totalSteps = 3;
	let step = $state(1);

	let formData = $state<Record<string, string>>({
		cedula: form?.data?.cedula ?? '',
		nombre: form?.data?.nombre ?? '',
		apellido: form?.data?.apellido ?? '',
		telefono: form?.data?.telefono ?? '',
		email: form?.data?.email ?? '',
		password: ''
	});

	let progress = $derived((step / totalSteps) * 100);
	let clientMessage = $state<string | null>(null);

	function nextStep() {
		clientMessage = null;

		const msg = validateStep(step, formData);
		if (msg) {
			clientMessage = msg;
			return;
		}

		if (step < totalSteps) step++;
	}

	function prevStep() {
		clientMessage = null;
		if (step > 1) step--;
	}
</script>

<svelte:head>
	<title>Registro</title>
</svelte:head>

<form method="POST" class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
	<input type="hidden" name="step" value={step} />

	<input type="hidden" name="cedula" value={formData.cedula} />
	<input type="hidden" name="nombre" value={formData.nombre} />
	<input type="hidden" name="apellido" value={formData.apellido} />
	<input type="hidden" name="telefono" value={formData.telefono} />
	<input type="hidden" name="email" value={formData.email} />
	<input type="hidden" name="password" value={formData.password} />

	<div class="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
		<h2 class="text-center text-2xl font-bold text-gray-900 dark:text-white">Crear cuenta</h2>

		<RegisterProgress {progress} />

		{#if clientMessage}
			<Alert color="red">{clientMessage}</Alert>
		{:else if form?.message && step === totalSteps}
			<Alert color="red">{form.message}</Alert>
		{/if}

		{#if step === 1}
			<RegisterStep1 {formData} />
		{:else if step === 2}
			<RegisterStep2 {formData} />
		{:else}
			<RegisterStep3 {formData} />
		{/if}

		<div class="flex justify-between pt-4">
			{#if step > 1}
				<button
					type="button"
					onclick={prevStep}
					class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100
					dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
				>
					Atrás
				</button>
			{/if}

			{#if step < totalSteps}
				<button
					type="button"
					onclick={nextStep}
					class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700
					dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					Siguiente
				</button>
			{:else}
				<button
					type="submit"
					class="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700
					dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					Crear cuenta
				</button>
			{/if}
		</div>

		<p class="text-center text-sm text-gray-600 dark:text-gray-300">
			¿Ya tienes cuenta?
			<a href="/login" class="font-medium text-blue-600 hover:underline dark:text-blue-400">
				Inicia sesión
			</a>
		</p>
	</div>
</form>
