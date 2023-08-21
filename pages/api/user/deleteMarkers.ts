import { NextApiRequest, NextApiResponse } from 'next'
import { deleteUserMarker } from '../controllers/user'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                res.status(401).json({
                    message: 'Se requiere un token de autenticación',
                })
            }
            const query = req.query as { id: string }
            const { id } = query
            if (typeof id !== 'string') {
                throw new Error('ID no válido')
            }
            const deletedMarker = await deleteUserMarker(id)
            res.status(200).json({ deletedMarker })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
