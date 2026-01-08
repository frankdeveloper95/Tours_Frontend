<script lang="ts">
	import { PUBLIC_HOST } from '$env/static/public';
	import { Rating, Star, type RatingIconProps } from 'flowbite-svelte';
	import type { PageProps } from './$types';

	const wrapper = (props: RatingIconProps) => (anchor: any, _props: RatingIconProps) =>
		Star(anchor, { ..._props, ...props });

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.tour.nombre}</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-6">
	<!-- Card principal -->
	<div
		class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
	>
		<!-- Hero imagen -->
		<div class="relative">
			<img
				class="h-72 w-full object-cover"
				src={`${PUBLIC_HOST}/public${data.tour.image_url}`}
				alt={data.tour.nombre}
				loading="lazy"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

			<div class="absolute bottom-4 left-4 right-4">
				<div class="flex flex-wrap items-end justify-between gap-3">
					<div class="min-w-0">
						<h1 class="truncate text-2xl font-bold text-white md:text-3xl">{data.tour.nombre}</h1>
						<p class="mt-1 line-clamp-1 text-sm text-white/80">
							{data.tour.operadora.nombre} • Guía: {data.tour.guia.usuario.nombre} {data.tour.guia.usuario.apellido}
						</p>
					</div>

					<!-- chip elegante -->
					<div
						class="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
					>
						{data.tour.guia.calificacion}/5 ★
					</div>
				</div>
			</div>
		</div>

		<!-- Contenido -->
		<div class="grid gap-8 p-6 md:grid-cols-3">
			<!-- Descripción -->
			<div class="space-y-4 md:col-span-2">
				<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Descripción</h2>
				<p class="leading-relaxed text-gray-700 dark:text-gray-200">
					{data.tour.descripcion}
				</p>

				<!-- Bloque info -->
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
						<p class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
							Ofrecido por
						</p>
						<p class="mt-1 text-base font-semibold text-gray-900 dark:text-white">
							{data.tour.operadora.nombre}
						</p>
					</div>

					<div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
						<p class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
							Guía
						</p>
						<p class="mt-1 text-base font-semibold text-gray-900 dark:text-white">
							{data.tour.guia.usuario.nombre} {data.tour.guia.usuario.apellido}
						</p>
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-4">
				<div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
					<h3 class="text-base font-semibold text-gray-900 dark:text-white">Calificación del guía</h3>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
						Basado en la experiencia de los usuarios.
					</p>

					<div class="mt-4 flex items-center justify-between">
						<span class="text-2xl font-bold text-gray-900 dark:text-white">
							{data.tour.guia.calificacion}
						</span>
						<span class="text-sm text-gray-500 dark:text-gray-400">de 5</span>
					</div>

					<div class="mt-3">
						<Rating
							icon={wrapper({ strokeColor: '#000000' })}
							id={data.tour.id}
							total={5}
							size={28}
							rating={data.tour.guia.calificacion}
						/>
					</div>

					<div class="mt-4 rounded-2xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-gray-900 dark:text-gray-300">
						Consejo: revisa el perfil del guía antes de reservar para mayor confianza.
					</div>
				</div>

				<!-- Botón opcional (si lo quieres en esta página) -->
				<!--
				<a
					href="/home"
					class="block rounded-2xl border border-gray-200 bg-white px-4 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
				>
					Volver
				</a>
				-->
			</div>
		</div>
	</div>
</div>
