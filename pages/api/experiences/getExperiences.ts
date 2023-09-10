import { NextApiRequest, NextApiResponse } from 'next'
import { getAllExperiences } from '../controllers/experiences'

const getExperiences = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const experiences = await getAllExperiences()
            res.status(200).json(experiences)
        } else {
            res.status(405).json({ message: 'Método no permitido' })
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export default getExperiences
