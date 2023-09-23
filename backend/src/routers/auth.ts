import express from 'express'
import { getCars, saveCar } from '../services/cars'
import { Car, User } from '@prisma/client'
import { register } from '../services/auth'
const router = express.Router()

router.post<'post', string, User>('/register', async (req, res) => {
    const user = req.body
    await register(user)
    res.send('You are registered')
})

router.post<'post', Car, User>('/login', async (req, res) => {

    const user = req.body
    // await login(user)
    
})

export default router