export type AdminUser = {
	id: string;
	rol_id: number;
	estado_id: number;
	cedula: string;
	nombre: string;
	apellido: string;
	telefono: string;
	email: string;
};

export type UsersListResponse = AdminUser[];
