import cors from 'cors'
import dotenv from 'dotenv';
import cars from './routers/cars'
import make from './routers/make'
import auth from './routers/auth'
import colours from './routers/colours'
import express, { Express, Request, Response } from 'express';
import { authenticateToken } from './middleware/auth';

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send({
        health: 'ok'
    })
})

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000'
}))

const api = express.Router()

app.use('/', auth)

app.use('/api', api)
api.use(authenticateToken)

api.use('/cars', cars)
api.use('/make', make)
api.use('/colours', colours)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})