import { prisma } from '@/lib/db'

export const getAllStore = async () => {
    const data = await prisma.store.findMany({
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
            createdAt: 'desc',
        },
    })

    return data
}

export const postStore = async (store: any) => {
    const data = await prisma.store.create({
        data: store,
    })

    return data
}

export const deleteStore = async (id: string) => {
    const data = await prisma.store.delete({
        where: { id },
    })

    return data
}

export const updateStore = async (id: string, store: any) => {
    const data = await prisma.store.update({
        where: { id },
        data: store,
    })

    return data
}

export const getStoreById = async (id: string) => {
    const data = await prisma.store.findUnique({
        where: { id },
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

    return data
}
