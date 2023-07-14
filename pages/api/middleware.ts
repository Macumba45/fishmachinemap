import { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken')

// Middleware para validar la autenticación del usuario
const authenticateUser = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
) => {
    // Obtener el token de autenticación del encabezado de la solicitud
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res
            .status(401)
            .json({ message: 'No se proporcionó un token de autenticación' })
    }

    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, 'clave-secreta')

        // Verificar si el usuario está autenticado (por ejemplo, verificar en la base de datos)

        // Pasar al siguiente middleware si la autenticación es exitosa
        next()
    } catch (error) {
        return res
            .status(401)
            .json({ message: 'Token de autenticación inválido' })
    }
}

export default authenticateUser
