import { prisma } from '@/app/lib/db'

export const getAllMarkers = async (userId: string) => {
    const markers = await prisma.marker.findMany({
        where: {
            userId,
        },
        include: {
            location: true,
            likes: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return markers
}
