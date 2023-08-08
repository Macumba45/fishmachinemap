import { NextApiRequest, NextApiResponse } from 'next'
import { getStoreById } from '../controllers/store'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const query = req.query as { id: string }
            const { id } = query
            if (!id) {
                return res.status(400).json({
                    message: 'Se requiere el parámetro "id"',
                })
            }
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                return res.status(401).json({
                    message: 'Token de autenticación no proporcionado',
                })
            }
            const productStore = await getStoreById(id)
            if (!productStore) {
                return res
                    .status(404)
                    .json({ message: 'No se encontró el producto' })
            }
            return res.status(200).json(productStore)
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    }
}
