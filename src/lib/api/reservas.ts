import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { ReservaAdmin } from '$lib/types/reservas.types';

/**
 * Construye headers con Authorization si existe token.
 */
function buildAuthHeaders(token?: string): HeadersInit {
    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
}

/**
 * Obtener todas las reservas (ADMIN)
 */
export async function getAllReservas(
    fetchFn: typeof fetch,
    token?: string
) {
    const url = `${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/reservas`;

    const res = await fetchFn(url, {
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });

    if (!res.ok) {
        return { ok: false as const, status: res.status, reservas: [] };
    }

    const reservas = (await res.json()) as ReservaAdmin[];
    return { ok: true as const, status: 200, reservas };
}

/**
 * Obtener reservas por usuario (ADMIN)
 */
export async function getReservasByUser(
    fetchFn: typeof fetch,
    userId: string,
    token?: string
) {
    const url = `${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/reservas/usuario/${userId}`;

    const res = await fetchFn(url, {
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });

    if (!res.ok) {
        return { ok: false as const, status: res.status, reservas: [] };
    }

    const reservas = (await res.json()) as ReservaAdmin[];
    return { ok: true as const, status: 200, reservas };
}

/**
 * Obtener reserva por ID (ADMIN)
 */
export async function getReservaById(
    fetchFn: typeof fetch,
    id: string,
    token?: string
) {
    const url = `${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/reservas/${id}`;

    const res = await fetchFn(url, {
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });

    if (!res.ok) {
        return { ok: false as const, status: res.status, reserva: null };
    }

    const reserva = (await res.json()) as ReservaAdmin;
    return { ok: true as const, status: 200, reserva };
}

/**
 * Cancelar reserva (ADMIN)
 */
export async function cancelReserva(
    fetchFn: typeof fetch,
    id: string,
    token?: string
) {
    return fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/reservas/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });
}

/**
 * Marcar como pagada (ADMIN)
 */
export async function pagarReserva(
    fetchFn: typeof fetch,
    id: string,
    token?: string
) {
    return fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/reservas/${id}/pagar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: buildAuthHeaders(token)
    });
}
