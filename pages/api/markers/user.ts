import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getUserByMarkerId } from '../controllers/user'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'GET') {
        try {
            const query = req.query as { userId: string }
            const { userId } = query
            if (!userId) {
                res.status(400).json({ message: 'ID de usuario no proporcionado' })
                return
            }
            const user = await getUserByMarkerId(userId as string)
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' })
                return
            }
            res.status(200).json({ user })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }

}
