import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { Tour } from '$lib/types/tour.types';

/**
 * Construye headers con Authorization si existe token.
 */
function buildAuthHeaders(token?: string): HeadersInit {
    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
}

/**
 * Obtener todos los tours (ADMIN)
 */
export async function getAllTours(
    fetchFn: typeof fetch,
    token?: string,
    is_active?: boolean
) {
    const url = new URL(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/tours`);

    if (is_active !== undefined) {
        url.searchParams.set("is_active", String(is_active));
    }


    const res = await fetchFn(url.toString(), {
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });

    if (!res.ok) {
        return { ok: false as const, status: res.status, tours: [] };
    }

    const tours = (await res.json()) as Tour[];
    return { ok: true as const, status: 200, tours };
}

/**
 * Obtener tour público por ID
 */
export async function getTourById(
    fetchFn: typeof fetch,
    id: string,
    token?: string,
    options: RequestInit = {}
) {
    const res = await fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours/${id}`, {
        credentials: 'include',
        headers: buildAuthHeaders(token),
        ...options
    });

    if (!res.ok) {
        return { ok: false as const, status: res.status, tour: null as Tour | null };
    }

    const tour = (await res.json()) as Tour;
    return { ok: true as const, status: 200, tour };
}


/**
 * Desactivar tour (ADMIN)
 */
export async function deactivateTour(fetchFn: typeof fetch, id: string, token?: string) {
    return fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/tours/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });
}

/**
 * Activar tour (ADMIN)
 */
export async function activateTour(fetchFn: typeof fetch, id: string, token?: string) {
    return fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/tours/${id}/activate`, {
        method: 'PATCH',
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });
}

/**
 * Obtener tour ADMIN por ID
 */
export async function getAdminTourById(
    fetchFn: typeof fetch,
    id: string,
    token?: string
) {
    const res = await fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/tours/${id}`, {
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });

    if (!res.ok) {
        return { ok: false as const, status: res.status, tour: null };
    }

    const tour = (await res.json()) as Tour;
    return { ok: true as const, status: 200, tour };
}
