import { NextApiRequest, NextApiResponse } from 'next'
import { getAllMarkers } from '../controllers/markers'

const getMarkersUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) => {
    try {
        const markers = await getAllMarkers(userId)
        res.status(200).json({ markers })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log('Este es el error:', error.message)
        throw new Error('Error al obtener los marcadores')
    }
}
export default getMarkersUser
