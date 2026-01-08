// src/lib/api/profile.ts
import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

export type Profile = {
	id?: number;
	cedula?: string;
	nombre?: string;
	apellido?: string;
	telefono?: string;
	email?: string;
	rol_id?: number;
	rol_nombre?: string;
	estado_id?: number;
	estado_nombre?: string;
};

type UpdateResult =
	| { ok: true; data?: Profile }
	| { ok: false; status: number; message?: string };

export async function getProfile(fetchFn: typeof fetch): Promise<Profile> {
	const res = await fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/users/me`, {
		credentials: 'include'
	});

	if (!res.ok) return {};
	return await res.json();
}

export async function updateProfile(
	fetchFn: typeof fetch,
	payload: Partial<Profile>
): Promise<UpdateResult> {
	const res = await fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/users/me`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		let msg: string | undefined;
		try {
			const j = await res.json();
			msg = j?.detail ?? j?.message;
		} catch {
			// ignore
		}
		return { ok: false, status: res.status, message: msg };
	}

	let data: Profile | undefined;
	try {
		data = await res.json();
	} catch {
		// si el backend no devuelve body
	}
	return { ok: true, data };
}
