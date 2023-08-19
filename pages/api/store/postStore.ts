import { NextApiRequest, NextApiResponse } from 'next'
import { postStore } from '../controllers/store'
import { uploadImage } from '@/app/utils/cloudinary'
const jwt = require('jsonwebtoken')

interface CloudinaryResponse {
    secure_url: string
    // Otras propiedades que devuelva Cloudinary
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new Error('Token de autenticación no proporcionado')
        }
        const decodedToken = jwt.verify(token, 'token')
        const userId = decodedToken.userId
        const { title, category, description, picture, price, phone } = req.body

        try {
            // Subir la imagen a Cloudinary
            const pictureUrl = picture
            const cloudinaryResponse = (await uploadImage(
                pictureUrl
            )) as CloudinaryResponse

            const newStore = await postStore({
                title,
                category,
                description,
                picture: cloudinaryResponse.secure_url, // Utilizar la propiedad secure_url
                price,
                phone,
                userId,
            })
            res.status(200).json({ newStore })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
