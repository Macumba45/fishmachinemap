import { prisma } from '@/app/lib/db'

export const getAllBlablaFish = async () => {
    const data = await prisma.blaBlaFish.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            date: 'asc',
        },
    })

    return data
}
