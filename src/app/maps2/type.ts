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
