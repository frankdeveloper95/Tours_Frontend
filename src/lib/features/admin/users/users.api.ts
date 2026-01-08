import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { AdminUser } from './users.types';

type ApiFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

const base = `${PUBLIC_HOST}/api/${PUBLIC_VERSION}`;

// Arreglado (no tocar)
export async function getUsers(
	fetch: any,
	token: string,
	offset = 0,
	limit = 100,
	estado: 'active' | 'inactive' | 'all' = 'active'
): Promise<AdminUser[]> {
	const res = await fetch(
		`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/users?offset=${offset}&limit=${limit}&estado=${estado}`,
		{
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` }
		}
	);

	if (!res.ok) {
		const msg = await res.text().catch(() => '');
		throw new Error(`GET /users failed ${res.status}: ${msg}`);
	}

	return await res.json();
}

export async function createUser(fetch: ApiFetch, token: string, payload: any) {
	const res = await fetch(`${base}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		const msg = await res.text().catch(() => '');
		throw new Error(`POST /users failed ${res.status}: ${msg}`);
	}

	return await res.json().catch(() => null);
}

export async function editUser(fetch: ApiFetch, token: string, id: string | number, payload: any) {
	const res = await fetch(`${base}/users/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		const msg = await res.text().catch(() => '');
		throw new Error(`PUT /users/${id} failed ${res.status}: ${msg}`);
	}

	return await res.json().catch(() => null);
}

export async function deleteUser(fetch: ApiFetch, token: string, id: string | number) {
	const res = await fetch(`${base}/users/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!res.ok) {
		const msg = await res.text().catch(() => '');
		throw new Error(`DELETE /users/${id} failed ${res.status}: ${msg}`);
	}

	return await res.json().catch(() => null);
}
