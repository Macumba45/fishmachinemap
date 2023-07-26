import { prisma } from '@/app/lib/db'

export const getAllBlablaFish = async () => {
    const data = await prisma.blaBlaFish.findMany({
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    console.log(data)
    return data
}
