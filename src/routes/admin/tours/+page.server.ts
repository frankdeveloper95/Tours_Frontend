import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import {
    getAllTours,
    activateTour,
    deactivateTour
} from '$lib/api/tours.api';

// -------------------------------------------------------------
// 🔶 LOAD: Obtener todos los tours
// -------------------------------------------------------------
export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('access_token');


    if (!token) {
        throw redirect(302, '/login');
    }

    // 🔥 CORREGIDO: enviar token al backend
    const { ok, tours, status } = await getAllTours(fetch, token);


    return {
        tours: ok ? tours : []
    };
};

// -------------------------------------------------------------
// 🔶 ACTIONS: Activar / Desactivar tours
// -------------------------------------------------------------
export const actions: Actions = {
    // Desactivar tour
    deactivate: async ({ request, fetch, cookies }) => {
        const token = cookies.get('access_token');

        if (!token) return fail(401, { error: 'No autorizado' });

        const form = await request.formData();
        const id = form.get('id');


        // 🔥 CORREGIDO: enviar token
        const res = await deactivateTour(fetch, String(id), token);


        if (!res.ok) {
            return fail(400, { error: 'No se pudo desactivar el tour' });
        }

        return { success: true };
    },

    // Activar tour
    activate: async ({ request, fetch, cookies }) => {
        const token = cookies.get('access_token');

        if (!token) return fail(401, { error: 'No autorizado' });

        const form = await request.formData();
        const id = form.get('id');


        // 🔥 CORREGIDO: enviar token
        const res = await activateTour(fetch, String(id), token);


        if (!res.ok) {
            return fail(400, { error: 'No se pudo activar el tour' });
        }

        return { success: true };
    }
};
