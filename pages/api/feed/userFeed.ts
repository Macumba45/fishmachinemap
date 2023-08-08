import { NextApiRequest, NextApiResponse } from 'next'
import { userFeedInfo } from '../controllers/feed'

const userInfoFeed = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const query = req.query as { userId: string }
            const { userId } = query
            if (!userId) {
                return res.status(400).json({
                    message: 'Se requiere el parámetro "userId"',
                })
            }
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                return res.status(401).json({
                    message: 'Token de autenticación no proporcionado',
                })
            }
            const user = await userFeedInfo(userId)
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No se encontró el usuario' })
            }
            return res.status(200).json({ user })
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default userInfoFeed
