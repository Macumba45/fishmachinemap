import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/db'
const jwt = require('jsonwebtoken')

const postMarkersUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1]
    const { direction, markerType, description, picture } = req.body
    const { lat, lng } = req.body.location
    const decodedToken = jwt.verify(token, 'token')

    const userId = decodedToken.userId

    try {
        // Crear una nueva instancia del modelo Marker
        const marker = await prisma.marker.create({
            data: {
                direction,
                markerType,
                description,
                picture,
                userId,
            },
        })

        // Crear una nueva instancia del modelo Location
        const location = await prisma.location.create({
            data: {
                lat,
                lng,
                markerId: marker.id,
            },
        })

        console.log(location)
        res.status(200).json({ message: 'Marcador creado correctamente' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log('Este es el error:', error.message) // Muestra el mensaje de error completo
        throw new Error('Error al crear el marcador')
    }
}

export default postMarkersUser
