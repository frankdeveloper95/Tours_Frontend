import { PUBLIC_HOST, PUBLIC_VERSION } from "$env/static/public";
import { verifyToken } from "$lib/auth";
import { fail, redirect } from "@sveltejs/kit";
import * as v from 'valibot';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, fetch }) => {
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

    const users = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/users?offset=0&limit=100`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (users.ok) {
        const data = await users.json();
        return {
            users: data,
            token: token
        };
    }
}

export const actions = {
    create: async ({ request, fetch, cookies }) => {
        const data = Object.fromEntries(await request.formData());
        const token = cookies.get('access_token');
        const userSchema = v.object({
            cedula: v.pipe(
                v.string(),
                v.nonEmpty('La cedula es obligatoria'),
                v.maxLength(10),
                v.minLength(10, 'La cedula debe tener 10 digitos')
            ),
            email: v.pipe(
                v.string(),
                v.nonEmpty('El email es obligatorio'),
                v.email('El email no es valido')
            ),
            nombre: v.pipe(
                v.string(),
                v.nonEmpty('El nombre es obligatorio')
            ),
            apellido: v.pipe(
                v.string(),
                v.nonEmpty('El apellido es obligatorio')
            ),
            password: v.pipe(
                v.string(),
                v.nonEmpty('La contraseña es obligatoria'),
                v.minLength(6, 'La contraseña debe tener al menos 6 caracteres')
            ),
            telefono: v.pipe(
                v.string(),
                v.nonEmpty('El telefono es obligatorio'),
                v.minLength(10, 'El telefono debe tener al menos 10 digitos'),
                v.maxLength(10, 'El telefono debe tener como maximo 10 digitos')
            )
        })

        try {
            const validatedData = v.parse(userSchema, data);
            const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validatedData)
            })
            if (res.ok) {
                return { success: true };
            }
        } catch (e: any) {
            return fail(400, { data: data, errors: v.flatten<typeof userSchema>(e.issues) });
        }
    },
    edit: async ({ cookies, fetch, request }) => {
        const data = Object.fromEntries(await request.formData());
        const token = cookies.get('access_token');
        try {
            const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/users/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        rol_id: Number(data.rol_id)
                    }
                )
            });
        } catch (e: any) {
            return fail(400, {errors: e.issues });
        }
    }
}