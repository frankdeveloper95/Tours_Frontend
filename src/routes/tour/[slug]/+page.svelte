<script lang="ts">
	import type { PageProps } from './$types';
	import { Rating, Star, type RatingIconProps } from 'flowbite-svelte';
	const wrapper = (props: RatingIconProps) => (anchor: any, _props: RatingIconProps) =>
		Star(anchor, { ..._props, ...props });
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.tour.nombre}</title>
</svelte:head>

<div class="flex min-h-full flex-col gap-y-4 text-xl dark:text-white">
	<img
		class="h-64 w-fit bg-contain"
		src={`http://localhost:8000/public${data.tour.image_url}`}
		alt={data.tour.nombre}
	/>
	<span class="font-bold">{data.tour.nombre}</span>
	<p>{data.tour.descripcion}</p>
	<h2 class="font-bold">Ofrecido por:</h2>
	<span>{data.tour.operadora.nombre}</span>
	<h2 class="font-bold">Guia</h2>
	<span>{data.tour.guia.usuario.nombre} {data.tour.guia.usuario.apellido}</span>
	<h2 class="font-bold">Rating Guia:</h2>
	<Rating
		icon={wrapper({ strokeColor: '#000000' })}
		id={data.tour.id}
		total={5}
		size={30}
		rating={data.tour.guia.calificacion}
	/>
</div>
