import { redirect, type RequestEvent } from '@sveltejs/kit';

export const load = ({ url }: RequestEvent) => {
	const q = url.searchParams.toString();
	throw redirect(303, `/protected/checkout${q ? `?${q}` : ''}`);
};
