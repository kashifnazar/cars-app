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

export async function createCar(car: Car) {
    return await prisma.car.create({
        data: car
    })
}

export async function updateCar(id: number, car: Car) {
    return await prisma.car.update({
        data: car, 
        where: { id }
    })
}

export async function deleteCar(id: number) {
    return await prisma.car.delete({
        where: {
            id
        }
    })
}