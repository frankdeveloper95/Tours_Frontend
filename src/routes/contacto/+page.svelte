<script lang="ts">
	import { Button, Input, Label, Textarea, Alert } from 'flowbite-svelte';

	import { SITE } from '$lib/config/site';
	import type { ContactMessage } from '$lib/types/contact';
	import { buildWhatsAppLink } from '$lib/services/contact.service';

	let sent = false;

	let form: ContactMessage = {
		name: '',
		phone: '',
		email: '',
		message:
			'Hola! Me interesa información sobre sus tours (Isla Salango / Isla de la Plata / Los Frailes).'
	};

	const canSend = () => form.message.trim().length > 5;

	function handleSend() {
		sent = true;
		setTimeout(() => (sent = false), 3000);
	}

	function reset() {
		form = {
			name: '',
			phone: '',
			email: '',
			message:
				'Hola! Me interesa información sobre sus tours (Isla Salango / Isla de la Plata / Los Frailes).'
		};
	}
</script>

<svelte:head>
	<title>Contacto | {SITE.name}</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-10">
	<!-- HERO -->
	<div
		class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5"
	>
		<div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-2xl"></div>
		<div class="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-500/10 blur-2xl"></div>

		<div class="relative">
			<div class="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-400/20 dark:text-orange-300">
				<span>📩</span>
				<span>Respuesta rápida</span>
			</div>

			<h1 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
				Contacto
			</h1>
			<p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-white/60">
				Escríbenos para cotizar, confirmar disponibilidad o resolver dudas. Si ya tienes una fecha, indícanos
				el día y cuántas personas son.
			</p>

			<div class="mt-5 flex flex-col gap-3 sm:flex-row">
				<a
					class="w-full sm:w-auto"
					href={`https://wa.me/${SITE.whatsapp}`}
					target="_blank"
					rel="noreferrer"
				>
					<Button class="w-full" color="green">Abrir WhatsApp</Button>
				</a>

				<a
					class="w-full sm:w-auto"
					href={`https://www.tiktok.com/${SITE.tiktok}`}
					target="_blank"
					rel="noreferrer"
				>
					<Button class="w-full" color="dark">Ver TikTok</Button>
				</a>

				<div class="w-full sm:w-auto">
					<div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
						📍 {SITE.location}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ALERT -->
	{#if sent}
		<Alert color="green" class="mt-6">
			Listo ✅ Se preparó el mensaje para WhatsApp. Si deseas, puedes enviarlo ahora.
		</Alert>
	{/if}

	<div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- FORM -->
		<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
			<div class="flex items-start justify-between gap-4">
				<div>
					<h2 class="text-base font-bold text-slate-900 dark:text-white">Envíanos tu consulta</h2>
					<p class="mt-1 text-sm text-slate-600 dark:text-white/60">
						Completa el formulario y te respondemos lo más pronto posible.
					</p>
				</div>

				<div class="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
					<span>⏱️</span>
					<span>Respuesta 1–3h</span>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div class="sm:col-span-2">
					<Label for="name" class="mb-1">Nombre</Label>
					<Input id="name" name="name" placeholder="Tu nombre" bind:value={form.name} />
				</div>

				<div>
					<Label for="phone" class="mb-1">Teléfono</Label>
					<Input id="phone" name="phone" placeholder="Ej: 0991234567" bind:value={form.phone} />
				</div>

				<div>
					<Label for="email" class="mb-1">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="tucorreo@gmail.com"
						bind:value={form.email}
					/>
				</div>

				<div class="sm:col-span-2">
					<Label for="message" class="mb-1">Mensaje</Label>
					<Textarea
						id="message"
						name="message"
						rows={6}
						placeholder="Ej: Quiero reservar Isla Salango para el sábado. Somos 4 personas."
						bind:value={form.message}
					/>
					<p class="mt-2 text-xs text-slate-500 dark:text-white/50">
						Consejo: incluye <span class="font-semibold">fecha</span>, <span class="font-semibold">cantidad de personas</span> y
						<span class="font-semibold">tour</span>.
					</p>
				</div>

				<div class="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
					<a
						class="w-full sm:w-auto"
						href={canSend() ? buildWhatsAppLink(form) : '#'}
						target="_blank"
						rel="noreferrer"
						onclick={(e) => {
							if (!canSend()) e.preventDefault();
							else handleSend();
						}}
					>
						<Button class="w-full" color="green" disabled={!canSend()}>
							Enviar por WhatsApp
						</Button>
					</a>

					<Button class="w-full sm:w-auto" color="light" onclick={reset}>
						Limpiar
					</Button>
				</div>
			</div>
		</div>

		<!-- INFO -->
		<div class="space-y-6">
			<!-- QUICK INFO -->
			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
				<h2 class="text-base font-bold text-slate-900 dark:text-white">Datos rápidos</h2>

				<div class="mt-4 space-y-3">
					<div class="flex items-center gap-2 text-sm">
						<span class="text-slate-600 dark:text-white/60">📍 Ubicación:</span>
						<span class="font-semibold text-slate-900 dark:text-white">{SITE.location}</span>
					</div>

					<div class="flex items-center gap-2 text-sm">
						<span class="text-slate-600 dark:text-white/60">📱 WhatsApp:</span>
						<span class="font-semibold text-slate-900 dark:text-white">+{SITE.whatsapp}</span>
					</div>

					<div class="flex items-center gap-2 text-sm">
						<span class="text-slate-600 dark:text-white/60">🎵 TikTok:</span>
						<span class="font-semibold text-slate-900 dark:text-white">{SITE.tiktok}</span>
					</div>
				</div>

				<div class="mt-5 flex flex-col gap-3 sm:flex-row">
					<a class="w-full sm:w-auto" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
						<Button class="w-full" color="green">Abrir WhatsApp</Button>
					</a>

					<a
						class="w-full sm:w-auto"
						href={`https://www.tiktok.com/${SITE.tiktok}`}
						target="_blank"
						rel="noreferrer"
					>
						<Button class="w-full" color="dark">Ver TikTok</Button>
					</a>
				</div>
			</div>

			<!-- HELP / EXPECTATIONS -->
			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
				<h2 class="text-base font-bold text-slate-900 dark:text-white">Antes de escribir</h2>
				<p class="mt-1 text-sm text-slate-600 dark:text-white/60">
					Para atenderte más rápido, aquí van recomendaciones rápidas.
				</p>

				<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-white/10 dark:bg-white/5">
						<div class="font-semibold text-slate-900 dark:text-white">✅ Incluye</div>
						<div class="mt-1 text-slate-600 dark:text-white/70">
							Fecha, tour, cantidad de personas y si alguien se marea en lancha.
						</div>
					</div>

					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-white/10 dark:bg-white/5">
						<div class="font-semibold text-slate-900 dark:text-white">⛅ Clima</div>
						<div class="mt-1 text-slate-600 dark:text-white/70">
							Las actividades como snorkel/kayak dependen de condiciones del mar.
						</div>
					</div>

					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-white/10 dark:bg-white/5">
						<div class="font-semibold text-slate-900 dark:text-white">🐋 Temporada</div>
						<div class="mt-1 text-slate-600 dark:text-white/70">
							Jun–Sep: alta demanda (ballenas). Reservar con anticipación.
						</div>
					</div>

					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-white/10 dark:bg-white/5">
						<div class="font-semibold text-slate-900 dark:text-white">🕒 Horarios</div>
						<div class="mt-1 text-slate-600 dark:text-white/70">
							Consultas: 8:00 a. m. – 8:00 p. m. (respuesta habitual 1–3h).
						</div>
					</div>
				</div>
			</div>

			<!-- MAP placeholder (pro, sin depender de APIs) -->
			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
				<h2 class="text-base font-bold text-slate-900 dark:text-white">Zona</h2>
				<p class="mt-1 text-sm text-slate-600 dark:text-white/60">
					Operamos desde {SITE.location}.
				</p>

				<div class="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                    <iframe title="Mapa - Puerto López" src={SITE.osmEmbed} class="h-56 w-full" loading="lazy"></iframe>
                </div>
			</div>
		</div>
	</div>
</div>
