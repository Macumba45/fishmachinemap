import { NextApiRequest, NextApiResponse } from 'next'
import { getAllMarkers } from '../controllers/markers'

const getMarkersUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) => {
    try {
        const markers = await getAllMarkers(userId)
        res.setHeader('Access-Control-Allow-Origin', 'https://fishgramapp.vercel.app, http://localhost'); res.status(200).json({ markers })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log('Este es el error:', error.message)
        throw new Error('Error al obtener los marcadores')
    }
}
export default getMarkersUser
