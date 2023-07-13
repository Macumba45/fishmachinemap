import { getAuthenticatedToken } from '@/app/lib/storage/storage'
import { PositionMarker, UserMarker } from '@/app/maps/type'
import { prisma } from '../../lib/db'

const createMarker = async (
    markerData: UserMarker,
    locationData: PositionMarker,
    userId: string
) => {

    try {
        console.log("ENTRO 1")
        // Crear una nueva instancia del modelo Marker
        const marker = await prisma.marker.create({
            data: {
                ...markerData,
                userId
            },
        })
        console.log("ENTRO 2")
        // Crear una nueva instancia del modelo Location
        const location = await prisma.location.create({
            data: {
                ...locationData,
                markerId: marker.id,
            },
        })
        console.log("ENTRO 3")
        console.log(location)
        return {
            marker,
            location,
        }
    } catch (error: any) {
        console.log("Este es el error:", error.message) // Muestra el mensaje de error completo
        throw new Error('Error al crear el marcador')
    }
}

export default createMarker
