import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './db';

const handleSubmitSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
        res.status(400).json({ message: 'Email and password must be strings in the request body' });
        return;
    }

    const userData = {
        email: email,
        password: password,
    };
    console.log(userData);


    try {
        const user = await prisma?.user.create({ data: userData });
        res.status(200).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handleSubmitSignUp;
