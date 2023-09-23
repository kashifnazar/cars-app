import bcrypt from 'bcrypt'
import { Car, PrismaClient, User } from '@prisma/client'

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