<script lang="ts">
	import { Button, Label, Input, Textarea, Alert } from 'flowbite-svelte';
	import type { PageProps } from '../$types';

	let { form }: PageProps = $props();

	type TourFormData = {
		nombre?: string;
		destino?: string;
		descripcion?: string;
		fecha?: string;
		hora_inicio?: string;
		hora_fin?: string;
		precio?: string;
		capacidad_maxima?: string;
		image_url?: string;
		incluye?: string;
		no_incluye?: string;
		que_llevar?: string;
		itinerario?: string;
		politicas?: string;
	};

	const data = (form?.data ?? {}) as TourFormData;
	const errors = (form?.errors ?? {}) as Record<string, string>;

	function err(k: keyof TourFormData) {
		return errors?.[String(k)] ?? null;
	}
</script>

<svelte:head>
	<title>Crear tour</title>
</svelte:head>

<div class="mx-auto w-full max-w-3xl p-4 text-slate-900 dark:text-white">
	<h1 class="text-2xl font-bold">Crear tour</h1>
	<p class="mt-1 text-sm text-slate-600 dark:text-white/70">
		Completa los datos del tour. Los campos de listas van separados por saltos de línea (uno por ítem).
	</p>

	{#if form?.message}
		<Alert class="mt-4" color={form?.success ? 'green' : 'red'}>
			{form.message}
		</Alert>
	{/if}

	<form method="POST" class="mt-6 space-y-5">
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<Label for="nombre">Nombre</Label>
				<Input id="nombre" name="nombre" required value={data.nombre ?? ''} />
				{#if err('nombre')}<p class="mt-1 text-xs text-red-500">{err('nombre')}</p>{/if}
			</div>

			<div>
				<Label for="destino">Destino</Label>
				<Input id="destino" name="destino" required value={data.destino ?? ''} />
				{#if err('destino')}<p class="mt-1 text-xs text-red-500">{err('destino')}</p>{/if}
			</div>
		</div>

		<div>
			<Label for="descripcion">Descripción</Label>
			<Textarea id="descripcion" name="descripcion" rows={4} required value={data.descripcion ?? ''} />
			{#if err('descripcion')}<p class="mt-1 text-xs text-red-500">{err('descripcion')}</p>{/if}
		</div>

		<div class="grid gap-4 sm:grid-cols-3">
			<div>
				<Label for="fecha">Fecha</Label>
				<Input id="fecha" name="fecha" type="date" required value={data.fecha ?? ''} />
				{#if err('fecha')}<p class="mt-1 text-xs text-red-500">{err('fecha')}</p>{/if}
			</div>

			<div>
				<Label for="hora_inicio">Hora inicio</Label>
				<Input id="hora_inicio" name="hora_inicio" type="time" required value={data.hora_inicio ?? ''} />
				{#if err('hora_inicio')}<p class="mt-1 text-xs text-red-500">{err('hora_inicio')}</p>{/if}
			</div>

			<div>
				<Label for="hora_fin">Hora fin</Label>
				<Input id="hora_fin" name="hora_fin" type="time" required value={data.hora_fin ?? ''} />
				{#if err('hora_fin')}<p class="mt-1 text-xs text-red-500">{err('hora_fin')}</p>{/if}
			</div>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<Label for="precio">Precio (USD)</Label>
				<Input id="precio" name="precio" type="number" min="0" step="0.01" required value={data.precio ?? ''} />
				{#if err('precio')}<p class="mt-1 text-xs text-red-500">{err('precio')}</p>{/if}
			</div>

			<div>
				<Label for="capacidad_maxima">Capacidad máxima</Label>
				<Input
					id="capacidad_maxima"
					name="capacidad_maxima"
					type="number"
					min="1"
					step="1"
					required
					value={data.capacidad_maxima ?? ''}
				/>
				{#if err('capacidad_maxima')}<p class="mt-1 text-xs text-red-500">{err('capacidad_maxima')}</p>{/if}
			</div>
		</div>

		<div>
			<Label for="image_url">Image URL (opcional)</Label>
			<Input id="image_url" name="image_url" value={data.image_url ?? ''} placeholder="https://..." />
			{#if err('image_url')}<p class="mt-1 text-xs text-red-500">{err('image_url')}</p>{/if}
		</div>

		<div class="grid gap-4 sm:grid-cols-3">
			<div>
				<Label for="incluye">Incluye</Label>
				<Textarea id="incluye" name="incluye" rows={6} placeholder="Uno por línea" value={data.incluye ?? ''} />
			</div>

			<div>
				<Label for="no_incluye">No incluye</Label>
				<Textarea
					id="no_incluye"
					name="no_incluye"
					rows={6}
					placeholder="Uno por línea"
					value={data.no_incluye ?? ''}
				/>
			</div>

			<div>
				<Label for="que_llevar">Qué llevar</Label>
				<Textarea
					id="que_llevar"
					name="que_llevar"
					rows={6}
					placeholder="Uno por línea"
					value={data.que_llevar ?? ''}
				/>
			</div>
		</div>

		<div>
			<Label for="itinerario">Itinerario</Label>
			<Textarea id="itinerario" name="itinerario" rows={6} placeholder="Uno por línea" value={data.itinerario ?? ''} />
		</div>

		<div>
			<Label for="politicas">Políticas (opcional)</Label>
			<Textarea id="politicas" name="politicas" rows={4} value={data.politicas ?? ''} />
		</div>

		<Button type="submit" class="w-full rounded-2xl py-3 text-base font-semibold">
			Crear tour
		</Button>
	</form>
</div>
