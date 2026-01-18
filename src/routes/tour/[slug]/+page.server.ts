import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// si ya creaste estos helpers:
import { mapTourToVM } from '$lib/services/tour.mapper';
import type { Tour } from '$lib/types/tour.types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const id = Number(params.slug);
	if (!Number.isFinite(id)) throw error(400, 'ID inválido');

	const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours/${id}`, {
		credentials: 'include' // recomendado (por si el backend usa cookies)
	});

	if (!res.ok) throw error(res.status, 'No se pudo cargar el tour');

	const tour = (await res.json()) as Tour;

	// devolvemos data "limpia" para el Svelte
	return mapTourToVM(tour);
};
