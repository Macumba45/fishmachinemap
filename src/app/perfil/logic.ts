import { User } from 'next-auth'
import { useState } from 'react'
import { UserMarker } from '../maps/type'

export const useLogicUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])
    const [toBeDeletedMarkers, setToBeDeletedMarkers] = useState<{
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
                setUser(data.user)
                return response
            }
        } catch (error: any) {
            console.error('Error al obtener el usuario:', error.message)
        }
    }

    const getUserMarkers = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('/api/user/userMarkers', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setUserMarkers(data.user.markers)
        return response
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

    return {
        user,
        userMarkers,
        getUser,
        getUserMarkers,
        deleteUserMarkers,
        setToBeDeletedMarkers,
        toBeDeletedMarkers,
        noMarkers,
        width,
        setWidth,
    }
}
