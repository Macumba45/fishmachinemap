import { prisma } from '@/lib/db'

export const getAllMarkers = async (userId: string) => {
    const markers = await prisma.marker.findMany({
        where: {
            userId,
        },
        include: {
            location: true,
            likes: true,
            comments: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    picture: true,
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

export const addComment = async (
    userId: string,
    markerId: string,
    text: string
) => {
    const newComment = await prisma.comments.create({
        data: {
            userId,
            markerId,
            text,
        },
    })

    return newComment
}

export const getComments = async (markerId: string) => {
    const comments = await prisma.comments.findMany({
        where: {
            markerId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    picture: true,
                },
            },
        },
    })

    return comments
}

export const deleteComment = async (id: string) => {
    const deletedComment = await prisma.comments.delete({
        where: {
            id,
        },
    })

    return deletedComment
}
