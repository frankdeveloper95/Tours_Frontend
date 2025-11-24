import { verifyToken } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('access_token');

    if (!token) { 
        redirect(301, '/login');
     };

    const res = await verifyToken(token);

    if (res.ok) {
        const user = await res.json();
        if (user.rol_id != 1) {
            redirect(301, '/home');
        }
    }
}