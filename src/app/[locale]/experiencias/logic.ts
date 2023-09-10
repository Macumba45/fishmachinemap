import { useCallback, useState } from 'react'
import { getAuthenticatedToken } from '../../../lib/storage/storage'
import { Experiences, User } from './type'

export const useLogicExperience = () => {
    const [experiences, setExperiences] = useState<Experiences[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [title, setTitle] = useState('')
    const [picture, setPicture] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [url, setUrl] = useState('')

    const [loading, setLoading] = useState(false)

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

    const getExperiences = useCallback(async () => {
        try {
            setLoading(true)
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/experiences/getExperiences', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setExperiences(data)
                setLoading(false)
                return data
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const postExperience = useCallback(async (experience: Experiences) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/experiences/postExperiences', {
                method: 'POST',
                headers,
                body: JSON.stringify(experience),
            })
            if (response.ok) {
                const data = await response.json()
                return data
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    return {
        getUserInfo,
        currentUser,
        loading,
        getExperiences,
        experiences,
        postExperience,
        title,
        setTitle,
        picture,
        setPicture,
        category,
        setCategory,
        description,
        setDescription,
        price,
        setPrice,
        phone,
        setPhone,
        city,
        setCity,
        whatsapp,
        setWhatsapp,
        url,
        setUrl,
    }
}
