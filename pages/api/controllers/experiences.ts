import { prisma } from '@/lib/db'

export const getAllExperiences = async () => {
    const data = await prisma.experiencies.findMany({
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

    return data
}

export const postExperiences = async (experiences: any) => {
    const data = await prisma.experiencies.create({
        data: experiences,
    })
    return data
}

export const deleteExperiences = async (id: string) => {
    const data = await prisma.experiencies.delete({
        where: { id },
    })

    return data
}

export const updateExperiences = async (id: string, experiences: any) => {
    const data = await prisma.experiencies.update({
        where: { id },
        data: experiences,
    })

    return data
}
