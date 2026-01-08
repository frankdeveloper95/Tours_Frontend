<script lang="ts">
	type Step = {
		kicker: string;
		title: string;
		desc: string;
		icon: string;
	};

	type Benefit = {
		title: string;
		desc: string;
		icon: string;
	};

	const steps: Step[] = [
		{
			kicker: 'Paso 1',
			title: 'Explora los tours',
			desc: 'Revisa destinos, precios, horarios e imágenes. Elige el tour que más te guste.',
			icon: '🧭'
		},
		{
			kicker: 'Paso 2',
			title: 'Selecciona tu salida',
			desc: 'Confirma fecha, hora y cupos disponibles. Si vas en grupo, ajusta el número de personas.',
			icon: '📅'
		},
		{
			kicker: 'Paso 3',
			title: 'Reserva e inicia sesión',
			desc: 'Si no tienes sesión, te pedirá iniciar sesión y luego vuelves automáticamente al checkout.',
			icon: '🔐'
		},
		{
			kicker: 'Paso 4',
			title: 'Recibe confirmación',
			desc: 'Verás el resumen de tu reserva y los detalles del tour. Nuestro equipo te acompaña si necesitas ayuda.',
			icon: '✅'
		}
	];

	const benefits: Benefit[] = [
		{
			title: 'Soporte rápido',
			desc: '¿Dudas antes de reservar? Escríbenos y te respondemos lo más pronto posible.',
			icon: '💬'
		},
		{
			title: 'Información clara',
			desc: 'Detalles del tour, horarios y lo que incluye, todo explicado antes de reservar.',
			icon: '📌'
		},
		{
			title: 'Pagos y seguridad',
			desc: 'Tu sesión se maneja con cookies seguras. (La integración de pagos puede activarse cuando ustedes la terminen.)',
			icon: '🛡️'
		}
	];
</script>

<svelte:head>
	<title>Cómo funciona | Spondylus</title>
</svelte:head>

<section class="relative mx-auto max-w-6xl px-4 py-10 text-gray-900 dark:text-white">
	<!-- Soft background glow -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl dark:bg-orange-400/10"
		/>
		<div
			class="absolute -right-24 top-10 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-400/10"
		/>
	</div>

	<!-- Header / Hero -->
	<header class="mb-8 overflow-hidden rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/40 sm:p-8">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
			<div>
				<div class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
					<span class="h-2 w-2 rounded-full bg-orange-500"></span>
					Spondylus Tours • Puerto López
				</div>

				<h1 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
					Cómo funciona
				</h1>
				<p class="mt-3 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
					Reserva tu tour en minutos. Sin complicaciones, con confirmación clara y soporte rápido.
				</p>

				<!-- Quick stats / trust -->
                <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <!-- Flujo -->
                    <div
                        class="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-5 shadow-sm backdrop-blur transition hover:from-orange-500/20 hover:to-orange-600/10 dark:border-orange-400/20"
                    >
                        <div class="flex items-center gap-3">
                            <div class="grid h-9 w-9 place-items-center rounded-xl bg-orange-500/20 text-lg">
                                🧭
                            </div>
                            <div>
                                <div class="text-xs font-semibold text-orange-400">Flujo</div>
                                <div class="text-sm font-bold text-white">4 pasos claros</div>
                            </div>
                        </div>
                        <p class="mt-2 text-xs text-gray-300">
                            Explora, selecciona, reserva y confirma.
                        </p>
                    </div>

                    <!-- Sesión -->
                    <div
                        class="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-5 shadow-sm backdrop-blur transition hover:from-blue-500/20 hover:to-blue-600/10 dark:border-blue-400/20"
                    >
                        <div class="flex items-center gap-3">
                            <div class="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/20 text-lg">
                                🔐
                            </div>
                            <div>
                                <div class="text-xs font-semibold text-blue-400">Sesión</div>
                                <div class="text-sm font-bold text-white">Cookies seguras</div>
                            </div>
                        </div>
                        <p class="mt-2 text-xs text-gray-300">
                            Tu sesión se mantiene protegida.
                        </p>
                    </div>

                    <!-- Soporte -->
                    <div
                        class="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5 shadow-sm backdrop-blur transition hover:from-emerald-500/20 hover:to-emerald-600/10 dark:border-emerald-400/20"
                    >
                        <div class="flex items-center gap-3">
                            <div class="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/20 text-lg">
                                💬
                            </div>
                            <div>
                                <div class="text-xs font-semibold text-emerald-400">Soporte</div>
                                <div class="text-sm font-bold text-white">Ayuda cuando la necesites</div>
                            </div>
                        </div>
                        <p class="mt-2 text-xs text-gray-300">
                            Te acompañamos antes y después de reservar.
                        </p>
                    </div>
                </div>
			</div>

			<!-- CTA panel -->
			<div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900/50 sm:p-6 lg:w-[360px]">
				<div class="flex items-start gap-3">
					<div class="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500/10 text-xl dark:bg-orange-400/10">
						🐋
					</div>
					<div>
						<p class="text-sm font-semibold">¿Listo para reservar?</p>
						<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
							Explora tours y elige tu próxima aventura.
						</p>
					</div>
				</div>

				<div class="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
					<a
						href="/home"
						class="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 dark:focus:ring-orange-400/30"
					>
						<span>Ver tours</span>
						<span aria-hidden="true">→</span>
					</a>

					<a
						href="/contacto"
						class="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
					>
						<span>Contáctanos</span>
						<span aria-hidden="true">✉️</span>
					</a>
				</div>

				<div class="mt-4 text-xs text-gray-500 dark:text-gray-400">
					Tip: si no has iniciado sesión, te redirigimos al login y vuelves al checkout automáticamente.
				</div>
			</div>
		</div>
	</header>

	<!-- Steps: timeline feel -->
	<section class="mb-10">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-lg font-bold tracking-tight sm:text-xl">Tu reserva, paso a paso</h2>
			<div class="hidden items-center gap-2 text-xs text-gray-500 dark:text-gray-400 sm:flex">
				<span class="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
				Flujo guiado
			</div>
		</div>

		<div class="relative">
			<!-- connector line (desktop) -->
			<div class="pointer-events-none absolute left-6 top-7 hidden h-[calc(100%-3.5rem)] w-px bg-gray-200 dark:bg-gray-700 md:block"></div>

			<div class="grid gap-4 md:gap-5">
				{#each steps as s, i}
					<article
						class="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/40 md:pl-16"
					>
						<!-- number badge -->
						<div class="absolute left-5 top-6 hidden md:block">
							<div class="relative grid h-10 w-10 place-items-center rounded-2xl border border-gray-200 bg-white text-sm font-extrabold text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white">
								{i + 1}
							</div>
						</div>

						<!-- gradient accent -->
						<div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
							<div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10"></div>
							<div class="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10"></div>
						</div>

						<div class="relative flex items-start gap-4">
							<div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gray-100 text-xl dark:bg-gray-800">
								{s.icon}
							</div>

							<div class="min-w-0">
								<div class="flex flex-wrap items-center gap-2">
									<span class="text-xs font-semibold text-blue-600 dark:text-blue-400">{s.kicker}</span>
									<span class="text-xs text-gray-400 dark:text-gray-500">•</span>
									<span class="text-xs text-gray-500 dark:text-gray-400">Spondylus</span>
								</div>

								<h3 class="mt-1 text-base font-bold sm:text-lg">{s.title}</h3>
								<p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
									{s.desc}
								</p>

								<!-- micro hint per step -->
								{#if i === 2}
									<p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
										✨ Si ya tienes sesión, pasas directo al checkout.
									</p>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits -->
	<section class="mb-10">
		<h2 class="text-lg font-bold tracking-tight sm:text-xl">Lo que te garantizamos</h2>
		<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
			Transparencia, acompañamiento y una experiencia más simple al reservar.
		</p>

		<div class="mt-5 grid gap-4 lg:grid-cols-3">
			{#each benefits as b}
				<div class="group rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900/40">
					<div class="flex items-start gap-4">
						<div class="grid h-12 w-12 place-items-center rounded-2xl bg-gray-100 text-xl dark:bg-gray-800">
							{b.icon}
						</div>
						<div>
							<h3 class="text-base font-bold">{b.title}</h3>
							<p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{b.desc}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Bottom CTA bar -->
	<section class="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 sm:p-7">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h3 class="text-base font-extrabold">¿Listo para tu próxima aventura?</h3>
				<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
					Explora tours, elige tu salida y reserva en minutos.
				</p>
			</div>
			<div class="flex flex-col gap-3 sm:flex-row">
				<a
					href="/home"
					class="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 dark:focus:ring-orange-400/30"
				>
					Ver tours <span aria-hidden="true">→</span>
				</a>
				<a
					href="/contacto"
					class="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
				>
					Contáctanos <span aria-hidden="true">✉️</span>
				</a>
			</div>
		</div>
	</section>
</section>
