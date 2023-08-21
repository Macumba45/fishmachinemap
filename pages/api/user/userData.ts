import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getUserInfo } from '../controllers/user'
import { getAuthenticatedToken } from '@/lib/storage/storage'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const token = getAuthenticatedToken()
            if (!token) {
                return res.status(401).json({ message: 'Se requiere un token de autenticación' })
            }
            const decodedToken = jwt.verify(token, 'token') as JwtPayload // Decodificar el token y especificar el tipo como JwtPayload
            const userId = decodedToken.userId // Obtener el ID del usuario desde el token decodificado
            const user = await getUserInfo(userId)
            console.log('user', user)
            if (!user) {
                console.log('user', user)

                throw new Error('No se encontró el usuario')
            }
            res.status(200).json({ user })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
