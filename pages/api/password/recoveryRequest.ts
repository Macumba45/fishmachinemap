import { NextApiRequest, NextApiResponse } from 'next'
import { findEmailToRecover, insertUserRecovery } from '../controllers/password'

export default async function requestPassword(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body
            const user = await findEmailToRecover(email)
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' })
            }
            const token = await insertUserRecovery(user?.email || '')
            console.log(
                'Este es la URL:',
                'http://localhost:3000/es/auth/login/recoveryPassword?token=' +
                token
            )
            res.status(200).json(
                'http://localhost:3000/es/auth/login/recoveryPassword?token=' +
                token
            )
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
