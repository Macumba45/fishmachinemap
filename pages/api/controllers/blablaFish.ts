import { prisma } from '@/app/lib/db'

const getAllBlablaFish = async () => {
    const data = await prisma.blaBlaFish.findMany({
        include: {
            user: true,
        },
    })

    return data
}

export default getAllBlablaFish

