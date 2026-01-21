export interface ReservaAdmin {
    id: number;
    nombre_cliente: string;
    email_cliente: string;
    numero_personas: number;
    fecha_reserva: string;
    created_date: string;

    tour: {
        id: number;
        nombre: string;
        precio: number;
        fecha: string;
        image_url: string;
    };

    estado: {
        id: number;
        estado: string;
    };

    usuario: {
        id: string;
        nombre: string;
        apellido: string;
        email: string;
        rol_id: number;
    };
}
