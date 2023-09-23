import express from 'express'
import { User } from '@prisma/client'
import { generateAccessToken, login, register } from '../services/auth'
const router = express.Router()

router.post<'post', string, User>('/register', async (req, res) => {
    const user = req.body
    await register(user)
    res.send('You are registered')
})

router.post<'post', any, User>('/login', async (req, res) => {

    const user = req.body

    try {
        const authenticated = await login(user)

        if(!authenticated) throw new Error()

        res.json(generateAccessToken(user.username))

    } catch(e) {        
        res.status(401).send()
    }
    
})

export default router