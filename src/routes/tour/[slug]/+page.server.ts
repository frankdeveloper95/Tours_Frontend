import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { getTourById } from '$lib/api/tours.api';
import { mapTourToVM } from '$lib/services/tour.mapper';

export const load: PageServerLoad = async ({ fetch, params }) => {
    const id = Number(params.slug);

    if (!Number.isFinite(id)) {
        throw error(400, 'ID inválido');
    }

    const { ok, status, tour } = await getTourById(fetch, String(id), undefined, {
        cache: 'no-store'
    });

    if (!ok || !tour || tour.is_active === false) {
        throw error(404, 'Este tour no está disponible');
    }

    return mapTourToVM(tour);
};
