import { prisma } from "@/app/lib/db";


export const userInfo = async (userId: any) => {

    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    return data;
}

export const findUserMarkers = async (userId: any) => {

    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            markers: {
                include: {
                    location: true, // Incluir la ubicación de cada marcador
                },
            },
        },
    });

    return data;
}