import { prisma } from '@/app/lib/db'

export const toogleLikeMarker = async (markerId: string, userId: string) => {
    try {
        const existMarker = await prisma.marker.findUnique({
            where: { id: markerId },
        })
        if (!existMarker) {
            throw new Error('Marcador no encontrado')
        }

        // Verificar si el like ya existe para este usuario y marcador
        const existingLike = await prisma.likes.findFirst({
            where: {
                userId,
                markerId,
            },
        })

        if (existingLike) {
            // Si el like ya existe, lo eliminamos
            await prisma.likes.delete({ where: { id: existingLike.id } })
        } else {
            // Si el like no existe, lo creamos
            await prisma.likes.create({ data: { userId, markerId } })
        }

        // Actualizar el marcador para obtener los likes actualizados
        const marker = await prisma.marker.findUnique({
            where: {
                id: markerId,
            },
            include: {
                likes: true,
            },
        })

        return marker
    } catch (error: any) {
        console.log(error.message)
    }
}

// Función para obtener el número de likes de un marcador
export const numberOfLikes = async (markerId: string) => {
    const likes = await prisma.likes.findMany({
        where: {
            markerId,
        },
    })

    return likes.length
}

// Función para obtener y mostrar el número de likes para cada marcador
export const getMarkersWithLikes = async () => {
    try {
        // Obtener todos los marcadores
        const markers = await prisma.marker.findMany()

        // Para cada marcador, obtener el número de likes y mostrarlo
        for (const marker of markers) {
            const numberOfLikesForMarker = await numberOfLikes(marker.id)
            console.log(
                `El marcador con ID ${marker.id} tiene ${numberOfLikesForMarker} likes.`
            )
        }
        return markers
    } catch (error: any) {
        console.log(error.message)
    }
}
