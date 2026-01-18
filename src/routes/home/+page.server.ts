import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

export const load = async ({ fetch }) => {
	const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours?offset=0&limit=100`);

	if (!res.ok) return { tours: [] };

	return { tours: await res.json() };
};
