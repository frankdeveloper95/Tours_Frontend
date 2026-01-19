export interface Guia {
    id: number;
    usuario: {
        nombre: string;
    };
}

export interface TourPageData {
    guias: Guia[];
    success: boolean;
    message: string;
    data: Record<string, unknown>;
    errors: Record<string, string>;
}
