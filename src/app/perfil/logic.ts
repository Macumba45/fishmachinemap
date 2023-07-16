import { User } from 'next-auth'
import { useState } from 'react'
import { getAuthenticatedToken } from '../lib/storage/storage'

export const useLogicUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [userMarkers, setUserMarkers] = useState<any[]>([])

    const getUser = async () => {
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

    return {
        user,
        userMarkers,
        getUser,
        getUserMarkers,
    }
}
