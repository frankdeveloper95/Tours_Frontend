<script lang="ts">
	import { Button, Checkbox, Helper, Input, Label } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import LoginHeader from '$lib/features/auth/components/LoginHeader.svelte';

	let { form }: PageProps = $props();
	let remember = true;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main
	class="relative min-h-screen overflow-hidden
	bg-slate-50 text-slate-900
	dark:bg-slate-950 dark:text-white"
>
	<div class="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl bg-cyan-500/15 dark:bg-cyan-500/20" />
	<div class="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl bg-indigo-500/15 dark:bg-indigo-500/20" />
	<div
		class="absolute inset-0
		bg-[radial-gradient(circle_at_50%_30%,rgba(0,0,0,0.06),transparent_55%)]
		dark:bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_55%)]"
	/>

	<section class="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
		<div
			class="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl md:grid-cols-2
			border-slate-900/10 bg-white/70
			dark:border-white/10 dark:bg-white/5"
		>
			<!-- Panel izquierdo (branding) -->
			<div class="hidden flex-col justify-between p-10 md:flex">
				<div class="flex items-center gap-3">
					<div class="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900/5 dark:bg-white/10">
						<span class="text-lg font-bold text-slate-900 dark:text-white">S</span>
					</div>
					<div class="leading-tight">
						<p class="text-sm text-slate-500 dark:text-white/60">Spondylus</p>
						<p class="text-base font-semibold text-slate-900 dark:text-white">Tours</p>
					</div>
				</div>

				<div class="space-y-4">
					<h1 class="text-3xl font-semibold tracking-tight">Bienvenido de nuevo</h1>
					<p class="text-slate-600 dark:text-white/70">
						Inicia sesión para administrar tus reservas, usuarios y servicios desde el panel.
					</p>

					<ul class="space-y-2 text-sm text-slate-600 dark:text-white/70">
						<li class="flex items-center gap-2">
							<span class="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
							Acceso seguro y rápido
						</li>
						<li class="flex items-center gap-2">
							<span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
							Panel de gestión y control
						</li>
						<li class="flex items-center gap-2">
							<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
							Experiencia responsive
						</li>
					</ul>
				</div>

				<p class="text-xs text-slate-400 dark:text-white/40">© {new Date().getFullYear()} Spondylus Tours</p>
			</div>

			<!-- Panel derecho (form) -->
			<div class="p-8 sm:p-10">
				<LoginHeader />

				<form method="POST" class="space-y-5">
					<div class="space-y-2">
						<Label
							for="email"
							class="text-slate-700 dark:text-white/80"
							{...form?.success === false ? { color: 'red' } : {}}
						>
							Email
						</Label>

						<Input
							type="email"
							id="email"
							name="email"
							placeholder="example@domain.com"
							required
							value={form?.data?.email ?? ''}
							{...form?.success === false ? { color: 'red' } : {}}
							class="!bg-white !text-slate-900 placeholder:!text-slate-400
							dark:!bg-white/5 dark:!text-white dark:placeholder:!text-white/40"
						/>
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<Label
								for="password"
								class="text-slate-700 dark:text-white/80"
								{...form?.success === false ? { color: 'red' } : {}}
							>
								Password
							</Label>

							<a
								href="/auth/forgot"
								class="text-sm text-cyan-700 hover:underline
								dark:text-cyan-300/90 dark:hover:text-cyan-200"
							>
								¿Olvidaste tu contraseña?
							</a>
						</div>

						<!-- ✅ No repoblar password: evita el error TS y es mejor práctica -->
						<Input
							type="password"
							id="password"
							name="password"
							placeholder="••••••••"
							required
							{...form?.success === false ? { color: 'red' } : {}}
							class="!bg-white !text-slate-900 placeholder:!text-slate-400
							dark:!bg-white/5 dark:!text-white dark:placeholder:!text-white/40"
						/>
					</div>

					<div class="flex items-center justify-between">
						<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-white/70">
							<Checkbox bind:checked={remember} />
							Recordarme
						</label>

						<a
							href="/register"
							class="text-sm text-slate-600 hover:text-slate-900 hover:underline
							dark:text-white/60 dark:hover:text-white"
						>
							Crear cuenta
						</a>
					</div>

					{#if form?.success === false}
						<Helper color="red" class="!mt-0">{form?.message}</Helper>
					{/if}

					<Button type="submit" class="w-full">Ingresar</Button>

					<p class="text-center text-xs text-slate-500 dark:text-white/40">
						Al continuar, se aceptan los términos y políticas de privacidad.
					</p>
				</form>
			</div>
		</div>
	</section>
</main>
