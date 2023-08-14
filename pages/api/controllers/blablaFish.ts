import { prisma } from '@/lib/db'

export const getAllBlablaFish = async () => {
    const data = await prisma.blaBlaFish.findMany({
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
        orderBy: {
            date: 'asc',
        },
    })

    return data
}

export const postBlablaFish = async (blablaFish: any) => {
    const data = await prisma.blaBlaFish.create({
        data: blablaFish,
    })
    return data
}

export const deleteBlablaFish = async (id: string) => {
    const data = await prisma.blaBlaFish.delete({
        where: { id },
    })

    return data
}
