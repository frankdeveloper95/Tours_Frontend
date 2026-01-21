<script lang="ts">
	import { Button, Badge, Card, Accordion, AccordionItem } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import { PUBLIC_HOST } from '$env/static/public';

	let { data }: PageProps = $props();

	// Ajusta esto a tu marca
	const brand = {
		name: 'Spondylus',
		tagline: 'Reserva tours en Puerto López en minutos',
		subtitle:
			'Explora Isla Salango, snorkel, kayak y avistamiento de ballenas. Reservas seguras para turistas y operadoras.',
		ctaPrimary: 'Ver tours',
		ctaSecondary: 'Cómo funciona'
	};

	const highlights = [
		{ title: 'Isla Salango', desc: 'Piqueros patas azules, snorkel, playa y refrigerio.' },
		{ title: 'Ballenas (Jun–Sep)', desc: 'Avistamiento con guías locales y cupos limitados.' },
		{ title: 'Reservas seguras', desc: 'Proceso simple, confirmación y control de cupos.' },
		{ title: 'Operadoras verificadas', desc: 'Experiencias reales con atención local.' }
	];

	const steps = [
		{ n: '01', title: 'Explora tours', desc: 'Filtra por fecha, precio y duración.' },
		{ n: '02', title: 'Reserva', desc: 'Inicia sesión y completa tu reserva en minutos.' },
		{ n: '03', title: 'Disfruta', desc: 'Recibe confirmación y prepárate para la aventura.' }
	];

	const faqs = [
		{
			q: '¿Necesito una cuenta para ver los tours?',
			a: 'No. Puedes explorar todo sin cuenta. Solo se requiere iniciar sesión para reservar o ver “Mis Reservas”.'
		},
		{
			q: '¿Cómo funciona la reserva?',
			a: 'Seleccionas un tour, eliges fecha/cupos y confirmas. El sistema controla disponibilidad para evitar sobrecupo.'
		},
		{
			q: '¿Qué incluye el tour a Isla Salango?',
			a: 'Depende de la operadora, pero normalmente incluye transporte marítimo, guía, snorkel/kayak y refrigerio.'
		},
		{
			q: '¿Puedo cancelar?',
			a: 'Sí. La política depende de cada operadora y la anticipación. La app mostrará los términos del tour.'
		}
	];
</script>

<svelte:head>
	<title>Inicio | {brand.name}</title>
</svelte:head>

<div class="flex flex-col gap-10">
	<!-- HERO -->
	<section
		class="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-10"
	>
		<!-- fondo decorativo -->
		<div class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-200/60 blur-3xl dark:bg-primary-900/40"></div>
		<div class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-900/30"></div>

		<div class="relative grid gap-8 md:grid-cols-2 md:items-center">
			<div class="flex flex-col gap-4">
				<div class="flex flex-wrap items-center gap-2">
					<Badge color="blue" class="rounded-full">Puerto López</Badge>
					<Badge color="green" class="rounded-full">Isla Salango</Badge>
					<Badge color="purple" class="rounded-full">Tours & Operadoras</Badge>
				</div>

				<h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
					{brand.tagline}
				</h1>
				<p class="text-base text-gray-600 dark:text-gray-300 md:text-lg">
					{brand.subtitle}
				</p>

				<div class="mt-2 flex flex-wrap gap-3">
					<a href="/home">
						<Button class="rounded-2xl px-5 py-3 text-base font-semibold">
							{brand.ctaPrimary}
						</Button>
					</a>
					<a href="/como-funciona">
						<Button
							color="light"
							class="rounded-2xl border border-gray-200 px-5 py-3 text-base font-semibold dark:border-gray-800"
						>
							{brand.ctaSecondary}
						</Button>
					</a>
				</div>

				<p class="text-sm text-gray-500 dark:text-gray-400">
					Sin cuenta puedes ver todo. Para reservar, inicia sesión.
				</p>
			</div>

			<!-- Imagen (puedes cambiar a una real luego) -->
			<div class="relative">
				<div
					class="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-sky-50 to-white shadow-sm dark:border-gray-800 dark:from-gray-800 dark:to-gray-900"
				>
					<div class="flex h-full flex-col justify-end p-6">
						<p class="text-sm font-semibold text-gray-700 dark:text-gray-200">Destacado</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">Isla Salango</p>
						<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
							Piqueros patas azules • Snorkel • Kayak
						</p>

						<div class="mt-4 flex flex-wrap gap-2">
							<Badge color="violet" class="rounded-full">Refrigerio</Badge>
							<Badge color="green" class="rounded-full">Guía local</Badge>
							<Badge color="red" class="rounded-full">Cupos limitados</Badge>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- HIGHLIGHTS -->
	<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each highlights as h}
			<Card class="rounded-3xl border border-gray-200 shadow-sm dark:border-gray-800">
				<h3 class="text-lg font-bold text-gray-900 dark:text-white">{h.title}</h3>
				<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{h.desc}</p>
			</Card>
		{/each}
	</section>

	<!-- FEATURED TOURS -->
	<section class="flex flex-col gap-4">
		<div class="flex items-end justify-between gap-3">
			<div>
				<h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">Tours destacados</h2>
				<p class="text-sm text-gray-600 dark:text-gray-300">
					Una selección rápida para empezar.
				</p>
			</div>

			<a href="/home" class="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
				Ver todos →
			</a>
		</div>

		{#if (data.featured?.length ?? 0) === 0}
			<div
				class="rounded-3xl border border-dashed border-gray-300 bg-white p-6 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
			>
				<p class="font-semibold">Aún no hay tours destacados para mostrar.</p>
				<p class="text-sm opacity-90">Cuando tu API devuelva tours, aquí se verán automáticamente.</p>
			</div>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.featured as tour}
					<a
						href={`/tour/${tour.id}`}
						class="group rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
					>
						<div class="overflow-hidden rounded-3xl">
							<div class="aspect-[16/10] bg-gray-100 dark:bg-gray-800">
								{#if tour.image_url}
									<img
										class="h-72 w-full object-cover sm:h-96"
										src={tour.image_url ?? 'https://i.ytimg.com/vi/nHnZxTvBj30/maxresdefault.jpg'}
										alt={tour.nombre}
										loading="lazy"
									/>
								{/if}
							</div>

							<div class="p-5">
								<p class="text-lg font-bold text-gray-900 dark:text-white">
									{tour.nombre}
								</p>
								<p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
									{tour.descripcion}
								</p>

								<div class="mt-4 flex items-center justify-between">
									<span class="text-sm font-semibold text-primary-600 dark:text-primary-400">
										Ver detalle →
									</span>
									{#if tour.precio}
										<span class="text-sm font-bold text-gray-900 dark:text-white">
											${tour.precio}
										</span>
									{/if}
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- HOW IT WORKS -->
	<section
		class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-10"
	>
		<div class="flex flex-col gap-2">
			<h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">¿Cómo funciona?</h2>
			<p class="text-sm text-gray-600 dark:text-gray-300">
				Un flujo simple para que el turista reserve y la operadora controle cupos.
			</p>
		</div>

		<div class="mt-6 grid gap-4 md:grid-cols-3">
			{#each steps as s}
				<div class="rounded-3xl border border-gray-200 p-5 dark:border-gray-800">
					<p class="text-sm font-extrabold text-primary-600 dark:text-primary-400">{s.n}</p>
					<p class="mt-1 text-lg font-bold text-gray-900 dark:text-white">{s.title}</p>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
				</div>
			{/each}
		</div>

		<div class="mt-6 flex flex-wrap gap-3">
			<a href="/home">
				<Button class="rounded-2xl px-5 py-3 text-base font-semibold">Explorar tours</Button>
			</a>

			{#if !data?.user}
				<a href="/auth/login">
					<Button
						color="light"
						class="rounded-2xl border border-gray-200 px-5 py-3 text-base font-semibold dark:border-gray-800"
					>
						Iniciar sesión para reservar
					</Button>
				</a>
			{/if}
		</div>
	</section>

	<!-- FAQs -->
	<section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
		<h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">Preguntas frecuentes</h2>
		<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
			Respuestas rápidas para que nadie se quede con dudas.
		</p>

		<div class="mt-4">
			<Accordion>
				{#each faqs as f, i}
					<AccordionItem id={"faq-" + i}>
						
						<!-- HEADER: debe ser inline y simple -->
						<span slot="header" class="font-semibold text-slate-900 dark:text-white">
							{f.q}
						</span>

						<!-- CONTENIDO: usa div para evitar errores de slot -->
						<div class="text-sm text-gray-600 dark:text-gray-300">
							{f.a}
						</div>

					</AccordionItem>
				{/each}
			</Accordion>
		</div>


	</section>

	<!-- CTA FINAL -->
	<section
		class="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-sky-50 p-6 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:to-gray-900 md:p-10"
	>
		<div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
			<div>
				<h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">
					¿Listo para tu próxima aventura?
				</h2>
				<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
					Mira los tours disponibles y reserva cuando estés listo.
				</p>
			</div>

			<div class="flex flex-wrap gap-3">
				<a href="/home">
					<Button class="rounded-2xl px-5 py-3 text-base font-semibold">Ver tours</Button>
				</a>
				<a href="/contacto">
					<Button
						color="light"
						class="rounded-2xl border border-gray-200 px-5 py-3 text-base font-semibold dark:border-gray-800"
					>
						Contactar
					</Button>
				</a>
			</div>
		</div>
	</section>
</div>
