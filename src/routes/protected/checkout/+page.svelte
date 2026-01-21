<script lang="ts">
	import type { PageProps } from './$types';
	import { Button, Input, Label, Textarea, Alert } from 'flowbite-svelte';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Checkout</title>
</svelte:head>

<div class="mx-auto w-full max-w-3xl p-4 text-slate-900 dark:text-white">
	<h1 class="text-2xl font-bold">Checkout</h1>
	<p class="mt-1 text-sm text-slate-600 dark:text-white/60">Confirma los datos para reservar.</p>

	{#if !data.tour}
		<div
			class="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900"
		>
			<p class="text-sm text-slate-700 dark:text-white/70">No se pudo cargar el tour.</p>
		</div>
	{:else}
		<div
			class="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900"
		>
			<!-- INFO DEL TOUR -->
			<div class="mb-4">
				<div class="text-xs font-semibold text-slate-500 dark:text-white/50">Tour</div>
				<div class="text-lg font-bold">{data.tour.nombre ?? 'Tour'}</div>
			</div>

			<!-- ERROR DEL ACTION -->
			{#if form?.ok === false}
				<Alert color="red" class="mb-4">
					{form?.message ?? 'No se pudo crear la sesión de pago.'}
				</Alert>
			{/if}

			<!-- FORMULARIO DE RESERVA -->
			<form method="POST" action="" class="flex flex-col gap-4">
				<input type="hidden" name="tourId" value={data.tourId} />

				<div>
					<Label for="nombre_cliente">Nombre completo</Label>
					<Input
						id="nombre_cliente"
						name="nombre_cliente"
						value={`${data.user.nombre} ${data.user.apellido}`}
						type="text"
						required
					/>
				</div>

				<div>
					<Label for="email_cliente">Correo electrónico</Label>
					<Input
						id="email_cliente"
						name="email_cliente"
						value={`${data.user.email}`}
						type="email"
						required
					/>
				</div>

				<div>
					<Label for="cantidad_personas">Cantidad de personas</Label>
					<Input
						id="cantidad_personas"
						name="cantidad_personas"
						value="1"
						type="number"
						min="1"
						required
					/>
				</div>

				<div>
					<Label for="fecha">Fecha</Label>
					<Input id="fecha" name="fecha" value={`${data.tour.fecha}`} type="date" required />
				</div>

				<div>
					<Label for="nota">Nota (opcional)</Label>
					<Textarea id="nota" name="nota" rows={3} placeholder="Ej: Recojo en el malecón..." />
				</div>

				<Button type="submit" class="rounded-xl">Ir a Stripe</Button>
			</form>
		</div>
	{/if}
</div>
