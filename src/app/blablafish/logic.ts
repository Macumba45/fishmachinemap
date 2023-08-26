import { useCallback, useState } from 'react'
import { BlaBlaFish } from './type'
import { getAuthenticatedToken } from '@/lib/storage/storage'

export const useLogicBlaBla = () => {
    const [departureCity, setDepartureCity] = useState('')
    const [arrivalCity, setArrivalCity] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [returnTime, setReturnTime] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [price, setPrice] = useState('')
    const [blaBlaFish, setBlaBlaFish] = useState<BlaBlaFish[]>([])
    const [selectedDate, setSelectedDate] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [dataBlablaUser, setDataBlablaUser] = useState<any>({})

    const postBlaBlaFish = useCallback(async (blaBlaFish: BlaBlaFish) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/blablafish/postBlaBla', {
                method: 'POST',
                headers,
                body: JSON.stringify(blaBlaFish),
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            console.error('Error al añadir viaje', error.message)
        }
    }, [])

    const fetchBlaBlaFish = useCallback(async () => {
        try {
            setLoading(true)
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/blablafish/getAllBlaBlaFish', {
                method: 'GET',
                headers,
            })
            const data = await response.json()
            setBlaBlaFish(data)
            setLoading(false)
            return data
        } catch (error: any) {
            console.error('Error al obtener viajes', error.message)
        }
    }, [])

    const getUserInfo = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            if (!token) return setDataBlablaUser(null)
            const response = await fetch('/api/user/userData', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setDataBlablaUser(data.user)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    return {
        postBlaBlaFish,
        departureCity,
        setDepartureCity,
        arrivalCity,
        setArrivalCity,
        departureTime,
        setDepartureTime,
        returnTime,
        setReturnTime,
        description,
        setDescription,
        phone,
        setPhone,
        price,
        setPrice,
        fetchBlaBlaFish,
        blaBlaFish,
        selectedDate,
        setSelectedDate,
        loading,
        dataBlablaUser,
        getUserInfo,
    }
}
