import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './db'
import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt')

const handleSubmitSignUp = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { email, password, name } = req.body

    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof name !== 'string'
    ) {
        res.status(400).json({
            message: 'Email and password must be strings in the request body',
        })
        return
    }

    const userData = {
        email: email,
        password: password,
        name: name,
    }

    try {
        // Genera un salt para el cifrado
        const salt = await bcrypt.genSalt(10)
        // Cifra la contraseña
        const hashedPassword = await bcrypt.hash(password, salt)
        // Reemplaza la contraseña en el objeto userData
        userData.password = hashedPassword
        // Guarda el usuario en la base de datos con la contraseña cifrada
        const user = await prisma?.user.create({ data: userData })
        const token = jwt.sign({ userId: user.id }, 'token');
        res.status(200).json({ message: 'User created successfully', user, token });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export default handleSubmitSignUp
