<script lang="ts">
	import { Button, Card, Badge } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	// ✅ helpers fuera del componente (arquitectura limpia)
	import { FALLBACK_IMG, formatDateEC, formatTimeHHMM } from '$lib/services/tour.format';
	import { PUBLIC_HOST } from '$env/static/public';

	const { data }: PageProps = $props();

	// ✅ data ya viene “normalizada” desde +page.server.ts (TourVM)
	const tour = data.tour;
	const operadoraNombre = data.operadoraNombre;
	const guiaNombre = data.guiaNombre;

	const incluye = data.incluye;
	const noIncluye = data.noIncluye;
	const queLlevar = data.queLlevar;
	const itinerario = data.itinerario;

	function reservar() {
		goto(`/protected/checkout?tourId=${tour.id}`);
	}
</script>

<svelte:head>
	<title>{tour.nombre}</title>
</svelte:head>

<div class="page">
	<div class="mx-auto w-full max-w-6xl px-4 py-10 text-slate-900 dark:text-white">
		<a
			href="/home"
			class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 hover:underline dark:text-white/70 dark:hover:text-white"
		>
			<span aria-hidden="true">←</span> Volver
		</a>

		<div class="mt-7 grid gap-10 lg:grid-cols-3">
			<!-- ===================== LEFT ===================== -->
			<div class="lg:col-span-2">
				<!-- HERO -->
				<div class="hero">
					<img
						class="hero-img"
						src={`${PUBLIC_HOST}/public${tour.image_url}`}
						alt={tour.nombre}
						loading="lazy"
					/>
					<div class="hero-overlay"></div>

					<div class="hero-content">
						<div class="flex flex-wrap items-center gap-2">
							<Badge color="gray" class="badge">{tour.destino}</Badge>
							<Badge color="gray" class="badge">{formatDateEC(tour.fecha)}</Badge>
							<Badge color="gray" class="badge">
								{formatTimeHHMM(tour.hora_inicio)} – {formatTimeHHMM(tour.hora_fin)}
							</Badge>
						</div>

						<h1 class="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
							{tour.nombre}
						</h1>

						{#if tour.descripcion}
							<p class="mt-2 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
								{tour.descripcion}
							</p>
						{/if}

						<div class="mt-4 flex flex-wrap gap-2">
							<span class="meta-pill">Fecha: {formatDateEC(tour.fecha)}</span>
							<span class="meta-pill">
								Horario: {formatTimeHHMM(tour.hora_inicio)}–{formatTimeHHMM(tour.hora_fin)}
							</span>
							<span class="meta-pill">Cupo: {tour.capacidad_maxima}</span>
						</div>
					</div>
				</div>

				<!-- HIGHLIGHTS -->
				<div class="mt-7 grid gap-4 sm:grid-cols-3">
					<div class="mini-card">
						<p class="mini-label">Fecha</p>
						<p class="mini-value">{formatDateEC(tour.fecha)}</p>
					</div>
					<div class="mini-card">
						<p class="mini-label">Horario</p>
						<p class="mini-value">
							{formatTimeHHMM(tour.hora_inicio)} – {formatTimeHHMM(tour.hora_fin)}
						</p>
					</div>
					<div class="mini-card">
						<p class="mini-label">Destino</p>
						<p class="mini-value">{tour.destino}</p>
					</div>
				</div>

				<!-- EQUIPO -->
				<div class="mt-12">
					<h2 class="section-title">Equipo</h2>
					<p class="section-subtitle">Información de la operadora y guía asignados.</p>

					<div class="mt-5 grid gap-4 sm:grid-cols-2">
						<Card class="card-min">
							<div class="flex items-center gap-2">
								<span class="icon-dot">🏢</span>
								<p class="text-xs font-semibold text-slate-500 dark:text-white/60">Operadora</p>
							</div>

							<p class="mt-2 text-base font-semibold text-slate-900 dark:text-white">
								{operadoraNombre}
							</p>

							{#if tour?.operadora?.telefono}
								<p class="mt-3 text-sm text-slate-600 dark:text-white/70">
									<span class="text-xs text-slate-500 dark:text-white/50">Tel:</span>
									{tour.operadora.telefono}
								</p>
							{/if}
						</Card>

						<Card class="card-min">
							<div class="flex items-center gap-2">
								<span class="icon-dot">🧭</span>
								<p class="text-xs font-semibold text-slate-500 dark:text-white/60">Guía</p>
							</div>

							<p class="mt-2 text-base font-semibold text-slate-900 dark:text-white">
								{guiaNombre}
							</p>

							<div class="mt-3 space-y-1 text-sm text-slate-600 dark:text-white/70">
								{#if tour?.guia?.idiomas?.length}
									<p>
										<span class="text-xs text-slate-500 dark:text-white/50">Idiomas:</span>
										{tour.guia.idiomas.join(', ')}
									</p>
								{/if}
								{#if tour?.guia?.calificacion != null}
									<p>
										<span class="text-xs text-slate-500 dark:text-white/50">Calificación:</span>
										{tour.guia.calificacion}
									</p>
								{/if}
							</div>
						</Card>
					</div>
				</div>

				<!-- CHIPS -->
				<div class="mt-12">
					<h2 class="section-title">Lo que necesitas saber</h2>
					<p class="section-subtitle">Información clara y fácil de leer.</p>

					<div class="mt-5 grid gap-4 lg:grid-cols-3">
						<Card class="card-min">
							<h3 class="text-sm font-semibold">Incluye</h3>
							{#if incluye.length}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each incluye as it}
										<span class="chip">{it}</span>
									{/each}
								</div>
							{:else}
								<p class="mt-3 text-sm text-slate-500 dark:text-white/50">No especificado.</p>
							{/if}
						</Card>

						<Card class="card-min">
							<h3 class="text-sm font-semibold">No incluye</h3>
							{#if noIncluye.length}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each noIncluye as it}
										<span class="chip">{it}</span>
									{/each}
								</div>
							{:else}
								<p class="mt-3 text-sm text-slate-500 dark:text-white/50">No especificado.</p>
							{/if}
						</Card>

						<Card class="card-min">
							<h3 class="text-sm font-semibold">Qué llevar</h3>
							{#if queLlevar.length}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each queLlevar as it}
										<span class="chip">{it}</span>
									{/each}
								</div>
							{:else}
								<p class="mt-3 text-sm text-slate-500 dark:text-white/50">No especificado.</p>
							{/if}
						</Card>
					</div>
				</div>

				<!-- ITINERARIO -->
				<div class="mt-12">
					<h2 class="section-title">Itinerario</h2>
					<p class="section-subtitle">Un recorrido paso a paso.</p>

					<Card class="card-min mt-5">
						{#if itinerario.length}
							<ol class="timeline">
								{#each itinerario as step, i}
									<li class="timeline-item">
										<span class="timeline-bullet">{i + 1}</span>
										<div class="timeline-body">{step}</div>
									</li>
								{/each}
							</ol>
						{:else}
							<p class="text-sm text-slate-500 dark:text-white/50">No especificado.</p>
						{/if}
					</Card>
				</div>

				<!-- POLITICAS -->
				{#if tour.politicas}
					<div class="mt-12">
						<h2 class="section-title">Políticas</h2>
						<Card class="card-min mt-5">
							<p class="text-sm leading-relaxed text-slate-600 dark:text-white/70">
								{tour.politicas}
							</p>
						</Card>
					</div>
				{/if}
			</div>

			<!-- ===================== RIGHT (SIDEBAR) ===================== -->
			<div class="lg:col-span-1">
				<div class="sticky top-6 space-y-4">
					<Card class="card-min">
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="text-xs text-slate-500 dark:text-white/50">Precio</p>
								<p
									class="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
								>
									{`$${tour.precio}`}
								</p>
								<p class="mt-1 text-xs text-slate-500 dark:text-white/50">Por persona</p>
							</div>

							<div
								class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right dark:border-white/10 dark:bg-white/5"
							>
								<p class="text-xs text-slate-500 dark:text-white/50">Cupo</p>
								<p class="text-sm font-semibold text-slate-900 dark:text-white">
									{tour.capacidad_maxima}
								</p>
							</div>
						</div>

						<Button
							class="btn-cta mt-5 w-full rounded-2xl py-3 text-base font-semibold"
							onclick={reservar}
							type="button"
						>
							Reservar ahora
						</Button>

						<p class="mt-3 text-xs leading-relaxed text-slate-500 dark:text-white/50">
							Te llevará al checkout para completar la reserva.
						</p>

						<div class="my-5 h-px w-full bg-slate-200 dark:bg-white/10"></div>

						<h3 class="text-sm font-semibold text-slate-900 dark:text-white">Detalles rápidos</h3>
						<div class="mt-3 space-y-3 text-sm text-slate-600 dark:text-white/70">
							<div class="flex items-center justify-between gap-4">
								<span class="text-slate-500 dark:text-white/50">Fecha</span>
								<span class="font-semibold text-slate-900 dark:text-white"
									>{formatDateEC(tour.fecha)}</span
								>
							</div>
							<div class="flex items-center justify-between gap-4">
								<span class="text-slate-500 dark:text-white/50">Horario</span>
								<span class="font-semibold text-slate-900 dark:text-white">
									{formatTimeHHMM(tour.hora_inicio)} – {formatTimeHHMM(tour.hora_fin)}
								</span>
							</div>
							<div class="flex items-center justify-between gap-4">
								<span class="text-slate-500 dark:text-white/50">Destino</span>
								<span class="font-semibold text-slate-900 dark:text-white">{tour.destino}</span>
							</div>
						</div>
					</Card>

					<div class="mini-card">
						<p class="font-semibold text-slate-900 dark:text-white">Reserva segura</p>
						<p class="mt-1 text-xs text-slate-500 dark:text-white/50">
							Interfaz limpia, checkout rápido y confirmación al instante.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* ✅ Light & Dark backgrounds */
	.page {
		background:
			radial-gradient(900px 520px at 12% 0%, rgba(59, 130, 246, 0.1), transparent 60%),
			radial-gradient(900px 520px at 90% 15%, rgba(168, 85, 247, 0.08), transparent 55%),
			linear-gradient(to bottom, #f8fafc, #eef2ff);
	}
	:global(html.dark) .page,
	:global(body.dark) .page,
	:global(.dark) .page {
		background:
			radial-gradient(1000px 600px at 20% 0%, rgba(59, 130, 246, 0.12), transparent 60%),
			radial-gradient(900px 600px at 90% 20%, rgba(168, 85, 247, 0.1), transparent 55%),
			linear-gradient(to bottom, #0b1220, #050814);
	}

	/* Hero */
	.hero {
		position: relative;
		overflow: hidden;
		border-radius: 28px;
		border: 1px solid rgba(15, 23, 42, 0.1);
		background: rgba(255, 255, 255, 0.65);
		box-shadow: 0 20px 60px rgba(2, 6, 23, 0.12);
	}
	:global(.dark) .hero {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.04);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
	}

	.hero-img {
		width: 100%;
		height: 430px;
		object-fit: cover;
		display: block;
	}
	@media (max-width: 640px) {
		.hero-img {
			height: 320px;
		}
	}
	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.78),
			rgba(0, 0, 0, 0.22),
			rgba(0, 0, 0, 0.06)
		);
	}
	.hero-content {
		position: absolute;
		left: 18px;
		right: 18px;
		bottom: 18px;
	}

	/* Badges */
	.badge {
		border-radius: 999px !important;
		padding: 6px 10px !important;
		font-size: 11px !important;
		background: rgba(255, 255, 255, 0.18) !important;
		border: 1px solid rgba(255, 255, 255, 0.18) !important;
		color: rgba(255, 255, 255, 0.95) !important;
	}

	/* Meta pills */
	.meta-pill {
		display: inline-flex;
		align-items: center;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(255, 255, 255, 0.12);
		padding: 7px 10px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.88);
		backdrop-filter: blur(10px);
	}

	/* Mini card (light & dark) */
	.mini-card {
		border-radius: 22px;
		border: 1px solid rgba(15, 23, 42, 0.1);
		background: rgba(255, 255, 255, 0.7);
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.03);
		backdrop-filter: blur(14px);
		padding: 18px;
		transition:
			transform 220ms ease,
			box-shadow 220ms ease,
			border-color 220ms ease;
	}
	.mini-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 16px 45px rgba(2, 6, 23, 0.1);
		border-color: rgba(15, 23, 42, 0.14);
	}
	:global(.dark) .mini-card {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.05);
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03);
	}
	:global(.dark) .mini-card:hover {
		box-shadow: 0 16px 45px rgba(0, 0, 0, 0.28);
		border-color: rgba(255, 255, 255, 0.14);
	}

	.mini-label {
		font-size: 12px;
		color: rgba(15, 23, 42, 0.55);
	}
	.mini-value {
		margin-top: 6px;
		font-size: 14px;
		font-weight: 600;
		color: rgba(15, 23, 42, 0.95);
	}
	:global(.dark) .mini-label {
		color: rgba(255, 255, 255, 0.6);
	}
	:global(.dark) .mini-value {
		color: rgba(255, 255, 255, 0.92);
	}

	/* Section */
	.section-title {
		font-size: 18px;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: rgba(15, 23, 42, 0.95);
	}
	.section-subtitle {
		margin-top: 4px;
		font-size: 14px;
		color: rgba(15, 23, 42, 0.6);
	}
	:global(.dark) .section-title {
		color: rgba(255, 255, 255, 0.95);
	}
	:global(.dark) .section-subtitle {
		color: rgba(255, 255, 255, 0.7);
	}

	/* Flowbite Card override */
	:global(.card-min) {
		border-radius: 22px !important;
		border: 1px solid rgba(15, 23, 42, 0.1) !important;
		background: rgba(255, 255, 255, 0.7) !important;
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.03) !important;
		padding: 12px;
		backdrop-filter: blur(14px);
		transition:
			transform 220ms ease,
			box-shadow 220ms ease,
			border-color 220ms ease;
	}
	:global(.card-min:hover) {
		transform: translateY(-2px);
		box-shadow: 0 16px 45px rgba(2, 6, 23, 0.1);
		border-color: rgba(15, 23, 42, 0.14) !important;
	}
	:global(.card-min .p-6) {
		padding: 18px !important;
	}
	:global(.dark .card-min) {
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		background: rgba(255, 255, 255, 0.05) !important;
		padding: 12px;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) !important;
	}
	:global(.dark .card-min:hover) {
		box-shadow: 0 16px 45px rgba(0, 0, 0, 0.28);
		border-color: rgba(255, 255, 255, 0.14) !important;
	}

	/* Icon */
	.icon-dot {
		display: grid;
		place-items: center;
		height: 30px;
		width: 30px;
		border-radius: 12px;
		border: 1px solid rgba(15, 23, 42, 0.1);
		background: rgba(15, 23, 42, 0.03);
	}
	:global(.dark) .icon-dot {
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.06);
	}

	/* Chip */
	.chip {
		display: inline-flex;
		align-items: center;
		border-radius: 999px;
		border: 1px solid rgba(15, 23, 42, 0.1);
		background: rgba(15, 23, 42, 0.03);
		padding: 7px 10px;
		font-size: 12px;
		color: rgba(15, 23, 42, 0.85);
		transition:
			background 180ms ease,
			border-color 180ms ease,
			transform 180ms ease;
	}
	.chip:hover {
		background: rgba(15, 23, 42, 0.06);
		border-color: rgba(15, 23, 42, 0.14);
		transform: translateY(-1px);
	}
	:global(.dark) .chip {
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.85);
	}
	:global(.dark) .chip:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.18);
	}

	/* Timeline */
	.timeline {
		position: relative;
		margin-top: 10px;
		padding-left: 22px;
		display: grid;
		gap: 14px;
	}
	.timeline::before {
		content: '';
		position: absolute;
		left: 10px;
		top: 6px;
		bottom: 6px;
		width: 1px;
		background: rgba(15, 23, 42, 0.1);
	}
	:global(.dark) .timeline::before {
		background: rgba(255, 255, 255, 0.12);
	}
	.timeline-item {
		display: grid;
		grid-template-columns: 28px 1fr;
		gap: 12px;
		align-items: start;
	}
	.timeline-bullet {
		display: grid;
		place-items: center;
		height: 26px;
		width: 26px;
		border-radius: 999px;
		border: 1px solid rgba(15, 23, 42, 0.1);
		background: rgba(255, 255, 255, 0.8);
		font-size: 12px;
		font-weight: 700;
		color: rgba(15, 23, 42, 0.9);
	}
	.timeline-body {
		border-radius: 18px;
		border: 1px solid rgba(15, 23, 42, 0.1);
		background: rgba(255, 255, 255, 0.65);
		padding: 12px 14px;
		color: rgba(15, 23, 42, 0.72);
		line-height: 1.6;
	}
	:global(.dark) .timeline-bullet {
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.9);
	}
	:global(.dark) .timeline-body {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.78);
	}

	/* ✅ CTA button: light & dark */
	:global(.btn-cta) {
		background: rgba(15, 23, 42, 0.95) !important; /* slate-900 */
		color: white !important;
		border: 1px solid rgba(15, 23, 42, 0.1) !important;
	}
	:global(.btn-cta:hover) {
		background: rgba(15, 23, 42, 0.88) !important;
	}
	:global(.dark .btn-cta) {
		background: rgba(255, 255, 255, 0.92) !important;
		color: rgba(15, 23, 42, 0.95) !important;
		border: 1px solid rgba(255, 255, 255, 0.14) !important;
	}
	:global(.dark .btn-cta:hover) {
		background: rgba(255, 255, 255, 0.85) !important;
	}
</style>
