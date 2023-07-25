import { useState } from 'react'
import { BlaBlaFish } from './type'

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

    const postBlaBlaFish = async (blaBlaFish: BlaBlaFish) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/api/blablafish/postBlaBla', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blaBlaFish),
            })
            console.log(response)
            const data = await response.json()
            return data
        } catch (error: any) {
            console.error('Error al añadir viaje', error.message)
        }
    }

    const fetchBlaBlaFish = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/api/blablafish/getAllBlaBlaFish', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            console.log(data)
            setBlaBlaFish(data)
            return data
        } catch (error: any) {
            console.error('Error al obtener viajes', error.message)
        }
    }

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
    }
}
