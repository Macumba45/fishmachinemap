import { prisma } from '@/app/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { userInfo } from '../controllers/user'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                throw new Error('Token de autenticación no proporcionado')
            }
            const decodedToken = jwt.verify(token, 'token') as JwtPayload // Decodificar el token y especificar el tipo como JwtPayload
            const userId = decodedToken.userId // Obtener el ID del usuario desde el token decodificado
            const user = await userInfo(userId)
            if (!user) {
                throw new Error('No se encontró el usuario')
            }
            res.status(200).json({ user })
            console.log(user)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
