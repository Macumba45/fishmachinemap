import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../src/app/lib/db'

const getMarkersUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) => {
    try {
        const markers = await prisma.marker.findMany({
            where: {
                userId,
            },
            include: {
                location: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        res.status(200).json({ markers })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log('Este es el error:', error.message) // Muestra el mensaje de error completo
        throw new Error('Error al obtener los marcadores')
    }
}

export default getMarkersUser
