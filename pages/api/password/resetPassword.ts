import { NextApiRequest, NextApiResponse } from 'next'
import { deleteUserRecovery, findToken, updatePassword } from '../controllers/password'

export default async function resetPassword(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { password, token } = req.body;
    const tokenTemporary = await findToken(token);

    try {

        if (!tokenTemporary) {
            res.status(404).json({ message: 'Token no encontrado' });
        } else {
            const updatedPassword = await updatePassword(password, token);
            res.status(200).json({ updatedPassword });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        deleteUserRecovery(tokenTemporary!.id)
    }
}
