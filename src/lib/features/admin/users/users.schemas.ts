import * as v from 'valibot';

export const createUserSchema = v.object({
	cedula: v.pipe(v.string(), v.nonEmpty('La cédula es obligatoria'), v.length(10, 'La cédula debe tener 10 dígitos')),
	email: v.pipe(v.string(), v.nonEmpty('El email es obligatorio'), v.email('El email no es válido')),
	nombre: v.pipe(v.string(), v.nonEmpty('El nombre es obligatorio')),
	apellido: v.pipe(v.string(), v.nonEmpty('El apellido es obligatorio')),
	password: v.pipe(v.string(), v.nonEmpty('La contraseña es obligatoria'), v.minLength(6, 'Mínimo 6 caracteres')),
	telefono: v.pipe(v.string(), v.nonEmpty('El teléfono es obligatorio'), v.length(10, 'El teléfono debe tener 10 dígitos')),
	rol_id: v.pipe(v.string(), v.nonEmpty('El rol es obligatorio'))
});

export const editUserSchema = v.object({
	id: v.pipe(v.string(), v.nonEmpty('ID requerido')),
	email: v.pipe(v.string(), v.nonEmpty('Email requerido'), v.email('Email no válido')),
	rol_id: v.pipe(v.string(), v.nonEmpty('Rol requerido'))
});
