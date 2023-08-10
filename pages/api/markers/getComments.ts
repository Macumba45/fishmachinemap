import { NextApiRequest, NextApiResponse } from 'next'
import { getComments } from '../controllers/markers'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { markerId } = req.query
            const comments = await getComments(markerId as string)
            res.status(200).json({ comments })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
