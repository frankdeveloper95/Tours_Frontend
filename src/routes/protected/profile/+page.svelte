<!-- src/routes/protected/profile/+page.svelte -->
<script lang="ts">
	import { Alert, Button, Card, Input, Label } from 'flowbite-svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const profile = data.profile;

	// Si viene un fail(...) del server, re-hidratamos con lo que el usuario intentó enviar
	const formData = form?.data ?? {
		cedula: profile?.cedula ?? '',
		nombre: profile?.nombre ?? '',
		apellido: profile?.apellido ?? '',
		telefono: profile?.telefono ?? '',
		email: profile?.email ?? ''
	};

	const errors = (form?.errors ?? {}) as Record<string, string[] | undefined>;
	const serverMessage = (form as any)?.message as string | undefined;
	const ok = form?.success === true;
	const bad = form?.success === false;
</script>

<svelte:head>
	<title>Perfil | Spondylus</title>
</svelte:head>

<div class="mx-auto w-full max-w-5xl p-4 sm:p-6">
	<div class="mb-6 flex flex-col gap-2">
		<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
			Mi perfil
		</h1>
		<p class="text-sm text-slate-600 dark:text-white/60">
			Actualiza tus datos personales y mantén tu cuenta al día.
		</p>
	</div>

	{#if ok}
		<Alert color="green" class="mb-4">
			{serverMessage ?? 'Cambios guardados.'}
		</Alert>
	{:else if bad}
		<Alert color="red" class="mb-4">
			{serverMessage ?? 'Ocurrió un error.'}
		</Alert>
	{/if}

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Columna izquierda: resumen -->
		<Card class="lg:col-span-1">
			<div class="flex items-center gap-4">
				<div
					class="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900/5 text-lg font-bold text-slate-900 dark:bg-white/10 dark:text-white"
				>
					{(profile?.nombre?.[0] ?? 'U').toUpperCase()}{(profile?.apellido?.[0] ?? '').toUpperCase()}
				</div>

				<div class="min-w-0">
					<div class="truncate text-base font-bold text-slate-900 dark:text-white">
						{profile?.nombre ?? '—'} {profile?.apellido ?? ''}
					</div>
					<div class="truncate text-sm text-slate-600 dark:text-white/60">
						{profile?.email ?? '—'}
					</div>
				</div>
			</div>

			<div class="mt-5 space-y-3 text-sm">
				<div class="flex items-center justify-between gap-3">
					<span class="text-slate-600 dark:text-white/60">Cédula</span>
					<span class="font-semibold text-slate-900 dark:text-white">{profile?.cedula ?? '—'}</span>
				</div>

				<div class="flex items-center justify-between gap-3">
					<span class="text-slate-600 dark:text-white/60">Teléfono</span>
					<span class="font-semibold text-slate-900 dark:text-white">{profile?.telefono ?? '—'}</span>
				</div>

				{#if profile?.rol_nombre}
					<div class="flex items-center justify-between gap-3">
						<span class="text-slate-600 dark:text-white/60">Rol</span>
						<span class="font-semibold text-slate-900 dark:text-white">{profile.rol_nombre}</span>
					</div>
				{/if}

				{#if profile?.estado_nombre}
					<div class="flex items-center justify-between gap-3">
						<span class="text-slate-600 dark:text-white/60">Estado</span>
						<span class="font-semibold text-slate-900 dark:text-white">{profile.estado_nombre}</span>
					</div>
				{/if}
			</div>

			<div class="mt-6 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600 dark:border-white/10 dark:text-white/60">
				<strong class="text-slate-900 dark:text-white">Tip:</strong> Mantén tu correo y teléfono correctos para
				recibir confirmaciones de reservas.
			</div>
		</Card>

		<!-- Columna derecha: formulario -->
		<Card class="lg:col-span-2">
			<h2 class="text-lg font-bold text-slate-900 dark:text-white">Editar datos</h2>
			<p class="mt-1 text-sm text-slate-600 dark:text-white/60">
				Estos datos se usarán para tus reservas y comunicaciones.
			</p>

			<form method="POST" action="?/update" class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
				<input type="hidden" name="cedula" value={formData.cedula} />

				<div class="sm:col-span-1">
					<Label for="nombre" class="mb-1">Nombre</Label>
					<Input
						id="nombre"
						name="nombre"
						placeholder="Tu nombre"
						value={formData.nombre}
						color={errors?.nombre ? 'red' : undefined}
						required
					/>
					{#if errors?.nombre?.length}
						<p class="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nombre[0]}</p>
					{/if}
				</div>

				<div class="sm:col-span-1">
					<Label for="apellido" class="mb-1">Apellido</Label>
					<Input
						id="apellido"
						name="apellido"
						placeholder="Tu apellido"
						value={formData.apellido}
						color={errors?.apellido ? 'red' : undefined}
						required
					/>
					{#if errors?.apellido?.length}
						<p class="mt-1 text-xs text-red-600 dark:text-red-400">{errors.apellido[0]}</p>
					{/if}
				</div>

				<div class="sm:col-span-1">
					<Label for="telefono" class="mb-1">Teléfono</Label>
					<Input
						id="telefono"
						name="telefono"
						placeholder="0987654321"
						value={formData.telefono}
						color={errors?.telefono ? 'red' : undefined}
						required
					/>
					{#if errors?.telefono?.length}
						<p class="mt-1 text-xs text-red-600 dark:text-red-400">{errors.telefono[0]}</p>
					{/if}
				</div>

				<div class="sm:col-span-1">
					<Label for="email" class="mb-1">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="tucorreo@dominio.com"
						value={formData.email}
						color={errors?.email ? 'red' : undefined}
						required
					/>
					{#if errors?.email?.length}
						<p class="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email[0]}</p>
					{/if}
				</div>

				<div class="sm:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-xs text-slate-600 dark:text-white/60">
						Al guardar, se actualizará tu información de cuenta.
					</p>

					<Button type="submit" formAction="?/update" class="rounded-2xl">
						Guardar cambios
					</Button>
				</div>
			</form>
		</Card>
	</div>
</div>
