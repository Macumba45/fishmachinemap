import { NextApiRequest, NextApiResponse } from 'next'
import { findEmailToRecover, insertUserRecovery } from '../controllers/password'
import { sendLinkPasswordRecovery } from '../nodeMailer/linkPassword'

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
            const url =
                'http://fishgramapp.vercel.app/es/auth/login/recoveryPassword?token=' +
                token
            await sendLinkPasswordRecovery(email, url)
            res.status(200).json(url)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
