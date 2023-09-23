import { Car, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getCars() {
    return await prisma.car.findMany({
        include: {
            colour: {
                select: {
                    name: true
                }
            },
            make: {
                select: {
                    name: true
                }
            }
        }
    })
}

export async function saveCar({id, ...car}: Car) {
    return await prisma.car.create({data: car})
}