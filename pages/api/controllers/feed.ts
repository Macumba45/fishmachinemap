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
