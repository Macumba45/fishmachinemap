import { useCallback, useState } from 'react'
import { getAuthenticatedToken } from '../../../lib/storage/storage'
import { User } from './type'

export const useLogicExperience = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const getUserInfo = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            if (!token) return setCurrentUser(null)
            const response = await fetch('/api/user/userData', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setCurrentUser(data.user)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    return { getUserInfo, currentUser }
}
