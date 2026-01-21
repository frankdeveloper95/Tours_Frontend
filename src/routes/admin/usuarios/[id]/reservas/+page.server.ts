import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
    const res = await fetch(`/api/v1/reservas/usuario/${params.id}`);
    const reservas = await res.json();
    return { reservas };
};
