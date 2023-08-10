import { prisma } from '@/lib/db'

export const getUserInfo = async (userId: any) => {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            markers: {
                include: {
                    location: true, // Incluir la ubicación de cada marcador
                },
                orderBy: {
                    createdAt: 'desc', // Ordenar los marcadores por fecha de creación de forma descendente
                },
            },
            Likes: true,
            blaBlaFish: true,
            stores: true,
        },
    })

    return data
}

export const deleteUserMarker = async (id: string) => {
    const deletedMarker = await prisma.marker.delete({
        where: {
            id,
        },
    })

    return deletedMarker
}

export const getUserByMarkerId = async (markerId: string) => {
    const data = await prisma.marker.findUnique({
        where: {
            id: markerId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    })

    return data?.user || null
}

export const toogleVisibleMarker = async (markerId: string) => {
    const marker = await prisma.marker.findUnique({
        where: {
            id: markerId,
        },
    })

    if (!marker) {
        throw new Error('Marcador no encontrado')
    }

    const updatedMarker = await prisma.marker.update({
        where: {
            id: markerId,
        },
        data: {
            visible: !marker.visible,
        },
    })

    return updatedMarker
}

export const isVisibileMarker = async (markerId: string) => {
    const marker = await prisma.marker.findUnique({
        where: {
            id: markerId,
        },
    })

    if (!marker) {
        throw new Error('Marcador no encontrado')
    }

    return marker.visible
}
