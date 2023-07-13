import { type } from 'os'

export type Props = {
    lat: number
    lng: number
}

export type MarkerData = {
    id: string
    shop: string
    lat: number
    lng: number
    label: string
    address: string
    imagen?: string
    date?: string
}

export type Style = {
    elementType?: string
    featureType?: string
    stylers: Array<{ color?: string; visibility?: string }>
}

export type Marker = {
    direccion: string
    tipoLugar: string
    descripcion: string
    fotos: File[]
    // Agrega aquí las demás propiedades requeridas por un objeto de tipo Marker
}

export type PositionMarker = {
    lat: number;
    lng: number;
}

export type UserMarker = {
    direction: string;
    markerType: string;
    description: string;
    picture: string;
    location: PositionMarker;
};
