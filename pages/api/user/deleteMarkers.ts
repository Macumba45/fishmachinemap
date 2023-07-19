import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { deleteUserMarker } from '../controllers/user'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                throw new Error('Token de autenticación no proporcionado')
            }
            const query = req.query as { id: string }
            const { id } = query
            console.log(id)
            const deletedMarker = await deleteUserMarker(id)
            console.log(deletedMarker)
            res.status(200).json({ deletedMarker })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
