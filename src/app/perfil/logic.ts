import { User } from 'next-auth'
import { useState } from 'react'
import { UserMarker } from '../maps/type'

export const useLogicUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])
    const [toBeDeletedMarkers, setToBeDeletedMarkers] = useState<{
        [key: string]: boolean
    }>({})
    const [blablaFish, setBlaBlaFish] = useState<UserMarker[]>([])
    const [picturesProfile, setPicturesProfile] = useState<string[]>([])
    const [markerVisibility, setMarkerVisibility] = useState<{
        [key: string]: boolean
    }>({})
    const noMarkers = userMarkers.length === 0

    const [width, setWidth] = useState<number>(0)

    const getUser = async () => {
        try {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token')
                const response = await fetch('/api/user/userData', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                setBlaBlaFish(data.user.blaBlaFish)
                setUser(data.user)
                setUserMarkers(data.user.markers)

                // Set marker visibility state
                const visibilityState: Record<string, any> = {}
                data.user.markers.forEach((marker: any) => {
                    visibilityState[marker.id as string] = marker.visible
                })
                setMarkerVisibility(visibilityState)

                return response
            }
        } catch (error: any) {
            console.error('Error al obtener el usuario:', error.message)
        }
    }

    const deleteUserMarkers = async (markerId: string) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(
                `/api/user/deleteMarkers?id=${markerId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            setToBeDeletedMarkers(prevState => ({
                ...prevState,
                [markerId]: false,
            }))
            await response.json()
            return response
        } catch (error: any) {
            console.error('Error al eliminar el marcador:', error.message)
        }
    }

    const updateMarker = async (markerId: string) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(
                `/api/markers/visibleMarker?id=${markerId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            await response.json()
            return response
        } catch (error: any) {
            console.error('Error al actualizar el marcador:', error.message)
        }
    }

    return {
        user,
        userMarkers,
        getUser,
        deleteUserMarkers,
        setToBeDeletedMarkers,
        toBeDeletedMarkers,
        noMarkers,
        width,
        setWidth,
        blablaFish,
        updateMarker,
        markerVisibility,
        setMarkerVisibility,
    }
}
