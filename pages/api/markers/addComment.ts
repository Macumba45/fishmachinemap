import { NextApiRequest, NextApiResponse } from 'next'
import { addComment } from '../controllers/markers'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { comment, markerId, userId } = req.body
            const newComment = await addComment(userId, markerId, comment)
            res.status(200).json({ newComment })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
