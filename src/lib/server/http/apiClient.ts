import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

type ApiFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export function apiUrl(path: string) {
	return `${PUBLIC_HOST}/api/${PUBLIC_VERSION}${path}`;
}

export async function apiFetch(fetch: ApiFetch, path: string, init?: RequestInit) {
	// Importante: con cookies HttpOnly siempre include
	const res = await fetch(apiUrl(path), { credentials: 'include', ...init });

	if (!res.ok) {
		const text = await res.text().catch(() => '');
		const err = new Error(text || `API error ${res.status}`);
		// @ts-expect-error
		err.status = res.status;
		throw err;
	}

	return res;
}
