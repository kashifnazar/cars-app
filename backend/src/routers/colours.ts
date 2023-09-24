import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await prisma.colour.findMany())
})

export default router
