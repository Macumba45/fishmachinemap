interface userMarker {
    id: string
    title: string
}

export interface ProfileProps {
    userData: {
        id: number
        name: string
        email: string
        password: string
        picture: string
    }
    markers: userMarker[]
}
