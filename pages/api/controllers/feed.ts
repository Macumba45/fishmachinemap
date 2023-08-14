import { prisma } from '@/lib/db'
// Función para agregar o quitar un like a un marcador
export const toggleLikeMarker = async (markerId: string, userId: string) => {
    try {
        // Buscar el marcador en la base de datos
        const marker = await prisma.marker.findUnique({
            where: { id: markerId },
            include: {
                likes: true,
            },
        })
        // Si el marcador no existe, lanzar un error
        if (!marker) {
            throw new Error('Marcador no encontrado')
        }
        // Buscar si el usuario ya ha dado like al marcador
        const existingLike = marker.likes.find(like => like.userId === userId)
        // Si el like ya existe, eliminarlo
        if (existingLike) {
            await prisma.likes.delete({ where: { id: existingLike.id } })
        } else {
            // Si el like no existe, crearlo
            await prisma.likes.create({ data: { userId, markerId } })
        }
        return marker
    } catch (error: any) {
        console.log(error.message)
    }
}
// Función para obtener el número de likes de un marcador
export const numberOfLikes = async (markerId: string) => {
    // Contar los likes en la base de datos
    const count = await prisma.likes.count({
        where: {
            markerId,
        },
    })
    return count
}

export const userFeedInfo = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            markers: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    location: true,
                    likes: true,
                    comments: true,
                },
            },
            blaBlaFish: true,
            stores: true,
        },
    })
    return user
}
