import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt')

export const findEmailToRecover = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    return user
}

export const insertUserRecovery = async (email: string) => {
    const token = jwt.sign({ email: email }, 'token')

    await prisma.userRecovery.create({
        data: {
            email: email,
            token: token,
        },
    })

    return token
}

export const findToken = async (token: string) => {
    const user = await prisma.userRecovery.findFirst({
        where: {
            token: token,
        },
    })

    return user
}

export const updatePassword = async (password: string, token: string) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userRecovery = await prisma.userRecovery.findFirst({
        where: {
            token,
        },
    })
    const user = await prisma.user.findFirst({
        where: {
            email: userRecovery?.email as string,
        },
    })
    await prisma.user.update({
        where: {
            email: user?.email as string,
            id: user?.id,
        },
        data: {
            password: hashedPassword,
        },
    })

    return userRecovery
}

export const deleteUserRecovery = async (id: string) => {
    const user = await prisma.userRecovery.delete({
        where: {
            id,
        },
    })
    return user
}
