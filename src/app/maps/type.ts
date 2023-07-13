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
    direction: string
    markerType: string
    description: string
    picture: string
    location: {
        lat: number
        lng: number
    }
}
