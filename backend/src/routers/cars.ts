import express from 'express'
import { getCars, saveCar } from '../services/cars'
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

export default router
