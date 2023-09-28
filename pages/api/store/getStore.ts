import { NextApiRequest, NextApiResponse } from 'next'
import { getAllStore } from '../controllers/store'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const storeData = await getAllStore()
            res.status(200).json({ storeData })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
