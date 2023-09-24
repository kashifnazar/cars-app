import express from 'express'
import { deleteCar, getCars, saveCar } from '../services/cars'
import { Car } from '@prisma/client'
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await getCars())
})

router.post<'post', Car, Car>('/', async (req, res) => {
    const car = req.body
    const newCar = await saveCar(car as Car)
    res.send(newCar)
})

router.delete<{id: string}, Car, Car>('/:id', async (req, res) => {
    const { id } = req.params
    const deletedCar = await deleteCar(+id)
    res.send(deletedCar)
})

export default router
