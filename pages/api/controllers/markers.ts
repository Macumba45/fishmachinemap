import { prisma } from '@/app/lib/db'

export const getAllMarkers = async (userId: string) => {
    const markers = await prisma.marker.findMany({
        where: {
            userId,
        },
        include: {
            location: true,
            likes: true,
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        // take: 10, // Limitar a 10 marcadores
        // skip: 0, // Opcionalmente, agregar paginación
    })
    return markers
}
