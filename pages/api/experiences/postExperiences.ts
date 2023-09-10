import { NextApiRequest, NextApiResponse } from 'next'
import { postExperiences } from '../controllers/experiences'
const jwt = require('jsonwebtoken')

const postExperience = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                throw new Error('Token de autenticación no proporcionado')
            }
            const decodedToken = jwt.verify(token, 'token')
            const userId = decodedToken.userId
            const {
                title,
                description,
                picture,
                price,
                phone,
                category,
                city,
                whatsapp,
            } = req.body
            const experience = await postExperiences({
                title,
                description,
                picture,
                price,
                phone,
                category,
                city,
                whatsapp,
                userId,
            })
            res.status(200).json({ experience })
        } else {
            res.status(405).json({ message: 'Método no permitido' })
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export default postExperience
