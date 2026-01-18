import type { Tour, TourVM } from '$lib/types/tour.types';
import { fullName, safeStringArray } from './tour.format';

export function mapTourToVM(tour: Tour): TourVM {
	const operadoraNombre = tour?.operadora?.nombre ?? tour?.operadora?.razon_social ?? 'Operadora';

	const guiaNombre = tour?.guia?.usuario
		? fullName(tour.guia.usuario.nombre, tour.guia.usuario.apellido) || 'Guía'
		: 'Guía';

	return {
		tour,
		operadoraNombre,
		guiaNombre,
		incluye: safeStringArray(tour?.incluye),
		noIncluye: safeStringArray(tour?.no_incluye),
		queLlevar: safeStringArray(tour?.que_llevar),
		itinerario: safeStringArray(tour?.itinerario)
	};
}
