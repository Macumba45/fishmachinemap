import { prisma } from '@/lib/db'

export const getUserInfo = async (userId: any) => {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            password: false,
            markers: {
                include: {
                    location: true, // Incluir la ubicación de cada marcador
                    comments: true, // Incluir los comentarios de cada marcador
                    likes: true, // Incluir los likes de cada marcador
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            picture: true,
                            password: false,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc', // Ordenar los marcadores por fecha de creación de forma descendente
                },
            },
            Likes: {
                include: {
                    marker: {
                        select: {
                            id: true,
                            description: true,
                            direction: true,
                            markerType: true,
                            picture: true,
                            userId: true,
                            visible: true,
                            location: true,
                            comments: true,
                            likes: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
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

export const uploadPictureProfile = async (userId: string, picture: string) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            picture,
        },
    })

    return updatedUser
}
