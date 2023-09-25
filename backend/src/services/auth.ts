import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function register(user: User) {
    const { username, password  } = user 

    const dbUser = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if(dbUser) return  //user already exists

    const encryptedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
        data: {username, password: encryptedPassword}
    })

    return { username }
}

export async function login(user: User) {
    const { username, password  } = user 

    const dbUser = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if(!dbUser) {
        throw new Error('Not authenticated')
    }

    return await bcrypt.compare(password, dbUser.password)
}

export function generateAccessToken(username: string) {
    //@ts-ignore
    return jwt.sign({username}, process.env.JWT_ACCESS_SECRET, { expiresIn: '18000s' });
}