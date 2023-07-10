import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

// export const userLogin = async (email: string, password: string) => {

// }

export const userSignup = async (email: string, password: string) => {
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }
        // Crear el nuevo usuario en la base de datos
        const newUser = await prisma.user.create({
            data: {
                email,
                password,
            },
        });
        return newUser;
    } catch (error) {
        throw new Error('Error al registrarse');
    }
};

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    try {
        const newUser = await userSignup(email, password);
        res.status(200).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};
export default signupHandler;
