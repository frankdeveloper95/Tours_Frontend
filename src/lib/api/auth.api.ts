import { PUBLIC_HOST } from '$env/static/public';

export async function registerUser(fetchFn: typeof fetch, data: any) {
	const base = PUBLIC_HOST.replace(/\/$/, '');
	const url = `${base}/public/auth_register/register`;

	const res = await fetchFn(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw { status: res.status, message: err?.detail ?? err?.message ?? 'Error al registrarse' };
	}

	return res.json().catch(() => ({}));
}
