export type Style = {
    elementType?: string
    featureType?: string
    stylers: Array<{ color?: string; visibility?: string }>
}

export type PositionMarker = {
    lat: number
    lng: number
}

export type UserMarker = {
    id?: string | ''
    direction: string
    markerType: string
    description: string
    picture: string | null
    location: {
        lat: number
        lng: number
    }
}
export type User = {
    // Define la interfaz del usuario según los datos que esperas recibir
    id: string;
    name: string;
    email: string;
    // Otros campos del usuario que necesites
}
