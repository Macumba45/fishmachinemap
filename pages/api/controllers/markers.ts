import { prisma } from '@/lib/db'

export const getAllMarkers = async (userId: string) => {
    const markers = await prisma.marker.findMany({
        where: {
            userId,
        },
        include: {
            location: true,
            likes: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        // take: 10, // Limitar a 10 marcadores
        // skip: 0, // Opcionalmente, agregar paginación
    })
    return markers
}

export const deleteUserMarker = async (id: string) => {
    const deletedMarker = await prisma.marker.delete({
        where: {
            id,
        },
    })

    return deletedMarker
}
