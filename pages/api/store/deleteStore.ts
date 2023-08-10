import { NextApiRequest, NextApiResponse } from 'next'
import { deleteStore } from '../controllers/store'

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
            const deletedStoreItem = await deleteStore(id)
            res.status(200).json({ deletedStoreItem })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
