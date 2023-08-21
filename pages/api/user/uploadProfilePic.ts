import { NextApiRequest, NextApiResponse } from 'next'
import { uploadPictureProfile } from '../controllers/user'
import { uploadImage } from '../../../src/app/utils/cloudinary'
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
            res.status(401).json({
                message: 'Se requiere un token de autenticación',
            })
        }
        const decodedToken = jwt.verify(token, 'token')
        const userId = decodedToken.userId
        const { picture } = req.body

        try {
            const pictureUrl = picture
            const cloudinaryResponse = (await uploadImage(
                pictureUrl
            )) as CloudinaryResponse
            const userPicture = await uploadPictureProfile(
                userId,
                cloudinaryResponse.secure_url
            )
            res.status(200).json({ userPicture })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
