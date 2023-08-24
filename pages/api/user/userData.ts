import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getUserInfo } from '../controllers/user'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                res.status(401).json({
                    message: 'Se requiere un token de autenticación',
                })
                return
            }
            const decodedToken = jwt.verify(
                token as string,
                'token'
            ) as JwtPayload // Decodificar el token y especificar el tipo como JwtPayload
            const userId = decodedToken.userId // Obtener el ID del usuario desde el token decodificado
            const user = await getUserInfo(userId)
            if (!user) {
                res.status(404).json({ message: 'No se encontró el usuario' })
                return
            }
            res.status(200).json({ user })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
