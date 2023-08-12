import { NextApiRequest, NextApiResponse } from 'next'
import { deleteComment } from '../controllers/markers'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        try {
            const { commentId } = req.query
            const deletedComment = await deleteComment(commentId as string)
            res.status(200).json({ deletedComment })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
