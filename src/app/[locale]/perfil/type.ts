interface userMarker {
    id: string
    title: string
}

export interface ProfileProps {
    id: string
    name: string
    email: string
    password: string
    picture: string
}

export type userLikesProps = {
    createdAt: string
    id: string
    markerId: string
    userId: string
    marker: {
        createdAt: string
        id: string
        description: string
        direction: string
        markerType: string
        picture: string
        userId: string
        visible: boolean
        location: {
            lat: number
            lng: number
        }
        comments: {
            createdAt: string
            id: string
            markerId: string
            text: string
            userId: string
        }[]
        likes: {
            createdAt: string
            id: string
            markerId: string
            userId: string
        }[]
    }
}
