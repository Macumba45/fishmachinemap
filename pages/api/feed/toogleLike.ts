import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { toggleLikeMarker, numberOfLikes } from '../controllers/feed'
const markerIsLiked = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                return res
                    .status(401)
                    .json({
                        message: 'Token de autenticación no proporcionado',
                    })
            }
            const decodedToken = jwt.verify(token, 'token') as JwtPayload // Decodificar el token y especificar el tipo como JwtPayload
            const userId = decodedToken.userId // Obtener el ID del usuario desde el token decodificado
            const { markerId } = req.body // Obtiene los datos del cuerpo de la solicitud
            if (!markerId) {
                return res
                    .status(400)
                    .json({ message: 'ID del marcador no proporcionado' })
            }
            const marker = await toggleLikeMarker(markerId, userId)
            if (!marker) {
                return res
                    .status(404)
                    .json({ message: 'Marcador no encontrado' })
            }
            const isLiked = marker.likes?.some(like => like.userId === userId)
            // Obtener y mostrar el número de likes para este marcador
            const numberOfLikesForMarker = await numberOfLikes(markerId)
            if (numberOfLikesForMarker === null) {
                return res
                    .status(404)
                    .json({ message: 'Likes no encontrados para el marcador' })
            }
            return res.status(200).json({ isLiked, numberOfLikesForMarker })
        } else {
            return res.status(405).json({ message: 'Método no permitido' })
        }
    } catch (error: any) {
        console.log('Este es el error:', error.message) // Muestra el mensaje de error completo
        throw new Error('Error al obtener los marcadores')
    }
}
export default markerIsLiked
