import { getAuthenticatedToken } from '@/app/lib/storage/storage'
import { prisma } from '../db'
import { PositionMarker, UserMarker } from '@/app/maps/type'

const createMarker = async (
    markerData: UserMarker,
    locationData: PositionMarker,
    userId: number
) => {

    try {

        if (typeof window !== 'undefined') {

            const token = window.localStorage.getItem('token')
            console.log('token', token)
            if (!token) {
                throw new Error('Usuario no autenticado')
            }

        }
        // Crear una nueva instancia del modelo Marker
        const marker = await prisma.marker.create({
            data: {
                ...markerData,
                userId,
            },
        })
        console.log(marker)
        // Crear una nueva instancia del modelo Location
        const location = await prisma.location.create({
            data: {
                ...locationData,
                markerId: marker.id,
            },
        })
        console.log(location)
        return {
            marker,
            location,
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al crear el marcador')
    }
}

export default createMarker
