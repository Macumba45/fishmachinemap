import { NextApiRequest, NextApiResponse } from 'next'
import { deleteBlablaFish } from '../controllers/blablaFish'

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
            if (typeof id !== 'string') {
                throw new Error('ID no válido')
            }
            const deleteBlaBla = await deleteBlablaFish(id)
            console.log(deleteBlaBla)
            res.status(200).json({ deleteBlaBla })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
