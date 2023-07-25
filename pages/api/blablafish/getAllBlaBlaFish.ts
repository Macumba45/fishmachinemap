import { NextApiRequest, NextApiResponse } from 'next'
import getAllBlablaFish from '../controllers/blablaFish'

const getAllPostBlablaFish = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === 'GET') {
        try {
            const data = await getAllBlablaFish()
            res.status(200).json(data)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}

export default getAllPostBlablaFish
