import { type } from "os"

export type Props = {
    lat: number
    lng: number
}

export type MarkerData = {
    id: number
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

type PositionMarker = {
    lat: number;
    lng: number;
}

export type userMarker = {
    direccion: string;
    tipoLugar: string;
    descripcion: string;
    fotos: File[];
    positionMarkerUser: PositionMarker;
}

