import { prisma } from '@/app/lib/db'

export const getUserInfo = async (userId: any) => {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    return data
}

export const getUserMarkers = async (userId: any) => {
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
    console.log(deletedMarker)

    return deletedMarker
}
