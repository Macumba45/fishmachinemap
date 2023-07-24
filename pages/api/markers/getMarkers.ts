import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../src/app/lib/db'
import { getAllMarkers } from '../controllers/markers'

const getMarkersUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) => {
    try {
        const markers = await getAllMarkers(userId)
        console.log(markers)
        res.status(200).json({ markers })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log('Este es el error:', error.message) // Muestra el mensaje de error completo
        throw new Error('Error al obtener los marcadores')
    }
}

export default getMarkersUser
