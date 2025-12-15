<script lang="ts">
	import { Input, Label, Alert } from 'flowbite-svelte';
	import type { PageProps } from './$types';

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

		if (step === 1) {
			if (!formData.cedula.trim() || !formData.nombre.trim() || !formData.apellido.trim()) {
				clientMessage = 'Completa cédula, nombre y apellido.';
				return;
			}
		}

		if (step === 2) {
			if (!formData.telefono.trim() || !formData.email.trim()) {
				clientMessage = 'Completa teléfono y email.';
				return;
			}
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
	<!-- ✅ step correcto -->
	<input type="hidden" name="step" value={step} />

	<!-- ✅ para que SIEMPRE se envíen aunque el paso no esté visible -->
	<input type="hidden" name="cedula" value={formData.cedula} />
	<input type="hidden" name="nombre" value={formData.nombre} />
	<input type="hidden" name="apellido" value={formData.apellido} />
	<input type="hidden" name="telefono" value={formData.telefono} />
	<input type="hidden" name="email" value={formData.email} />
	<!-- opcional: si quieres asegurar el envío aunque cambies la UI luego -->
	<input type="hidden" name="password" value={formData.password} />

	<div class="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
		<h2 class="text-center text-2xl font-bold text-gray-900 dark:text-white">Crear cuenta</h2>

		<div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
			<div class="h-2 rounded-full bg-blue-600 transition-all duration-300" style={`width: ${progress}%`} />
		</div>

		{#if clientMessage}
			<Alert color="failure">{clientMessage}</Alert>
		{:else if form?.message && step === totalSteps}
			<Alert color="failure">{form.message}</Alert>
		{/if}

		{#if step === 1}
			<div class="space-y-4">
				<div>
					<Label for="cedula">Cédula</Label>
					<Input id="cedula" name="cedula" bind:value={formData.cedula} required />
				</div>

				<div>
					<Label for="nombre">Nombre</Label>
					<Input id="nombre" name="nombre" bind:value={formData.nombre} required />
				</div>

				<div>
					<Label for="apellido">Apellido</Label>
					<Input id="apellido" name="apellido" bind:value={formData.apellido} required />
				</div>
			</div>
		{/if}

		{#if step === 2}
			<div class="space-y-4">
				<div>
					<Label for="telefono">Teléfono</Label>
					<Input id="telefono" name="telefono" bind:value={formData.telefono} required />
				</div>

				<div>
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" bind:value={formData.email} required />
				</div>
			</div>
		{/if}

		{#if step === 3}
			<div class="space-y-4">
				<div>
					<Label for="password">Contraseña</Label>
					<Input id="password" name="password" type="password" bind:value={formData.password} required />
				</div>
			</div>
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
