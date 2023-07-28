import { NextApiRequest, NextApiResponse } from 'next'
import { isVisibileMarker, toogleVisibleMarker } from '../controllers/user'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                throw new Error('Token de autenticación no proporcionado')
            }
            const query = req.query as { id: string }
            const { id } = query
            if (typeof id !== 'string') {
                throw new Error('ID no válido')
            }
            console.log(id)
            const updateMarker = await toogleVisibleMarker(id)
            await isVisibileMarker(id) // Utilizar la función isVisibileMarker
            res.status(200).json({ updateMarker })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
