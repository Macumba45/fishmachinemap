import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../src/lib/db'
const bcrypt = require('bcrypt')

const handledSubmitLogin = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // Obtén los datos del formulario de inicio de sesión desde req.body
    const { email, password } = req.body

    try {
        if (!email || !password) {
            res.status(401).json({ message: 'Email o Password inválido 1' })
            return
        }
        // Obtén el usuario de la base de datos utilizando Prisma
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!user) {
            res.status(401).json({ message: 'Email o Password inválido 2' })
            return
        }
        const match = await bcrypt.compareSync(password, user.password)

        if (!match) {
            res.status(401).json({ message: 'Email o Password inválido 3' })
            return
        }
        // Autenticación exitosa
        const token = jwt.sign({ userId: user.id }, 'token')
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user,
            token,
        })
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la autenticación
        res.status(500).json({ message: error })
    }
}

export default handledSubmitLogin
