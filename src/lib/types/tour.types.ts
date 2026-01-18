export type Tour = {
	id: number;
	nombre: string;
	descripcion?: string | null;
	destino: string;
	fecha: string;
	hora_inicio: string;
	hora_fin: string;
	precio: number;
	capacidad_maxima: number;
	image_url?: string | null;

	politicas?: string | null;

	incluye?: unknown;
	no_incluye?: unknown;
	que_llevar?: unknown;
	itinerario?: unknown;

	operadora?: {
		nombre?: string | null;
		razon_social?: string | null;
		telefono?: string | null;
	} | null;

	guia?: {
		idiomas?: string[] | null;
		calificacion?: number | null;
		usuario?: { nombre?: string | null; apellido?: string | null } | null;
	} | null;
};

export type TourVM = {
	tour: Tour;
	operadoraNombre: string;
	guiaNombre: string;
	incluye: string[];
	noIncluye: string[];
	queLlevar: string[];
	itinerario: string[];
};
