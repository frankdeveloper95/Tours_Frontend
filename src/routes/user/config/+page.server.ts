import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { verifyToken } from "$lib/auth";

export const load: PageServerLoad = async ({cookies}) => {
    const token = cookies.get('access_token');
    if (!token) { return };

    const res = await verifyToken(token);
    if (!res.ok) {
        redirect(301, '/login');
    }
}