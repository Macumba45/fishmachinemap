import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import {
    deleteUserRecovery,
    findToken,
    updatePassword,
} from '../controllers/password'

export default async function resetPassword(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { password, token } = req.body
    const tokenTemporary = await findToken(token)

    try {
        if (!tokenTemporary) {
            res.status(404).json({ message: 'Token no encontrado' })
        } else {
            // Verificar si el token ha caducado
            const decodedToken: any = jwt.decode(token)
            if (
                decodedToken &&
                decodedToken.exp &&
                Date.now() >= decodedToken.exp * 1000
            ) {
                res.status(401).json({ message: 'El token ha caducado' })
                return
            }
            console.log(decodedToken)
            const updatedPassword = await updatePassword(password, token)
            res.status(200).json({ updatedPassword })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    } finally {
        deleteUserRecovery(tokenTemporary?.id as string)
    }
}
