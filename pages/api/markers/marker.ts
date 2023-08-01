import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../src/lib/db'
import { uploadImage } from '../../../src/app/utils/cloudinary'
const jwt = require('jsonwebtoken')
interface CloudinaryResponse {
    secure_url: string
    // Otras propiedades que devuelva Cloudinary
}
const postMarkersUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1]
    const { direction, markerType, description } = req.body
    const { picture } = req.body
    const { lat, lng } = req.body.location
    const decodedToken = jwt.verify(token, 'token')
    const userId = decodedToken.userId
    try {
        // Subir la imagen a Cloudinary
        const pictureUrl = picture
        const cloudinaryResponse = (await uploadImage(
            pictureUrl
        )) as CloudinaryResponse
        // Crear una nueva instancia del modelo Marker
        const marker = await prisma.marker.create({
            data: {
                direction,
                markerType,
                description,
                picture: cloudinaryResponse.secure_url, // Utilizar la propiedad secure_url
                userId,
            },
        })
        // Crear una nueva instancia del modelo Location
        await prisma.location.create({
            data: {
                lat,
                lng,
                markerId: marker.id,
            },
        })
        res.status(200).json({ message: 'Marcador creado correctamente' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log('Este es el error:', error.message) // Muestra el mensaje de error completo
        throw new Error('Error al crear el marcador')
    }
}
export default postMarkersUser
