import express from 'express'
import { Car } from '../types/cars'
const router = express.Router()

// define the home page route
router.get<Array<Car>, Array<Car>>('/', (req, res) => {
  res.send([{
    id: '1',
    code: '123',
    make: {
      id: 'AUD',
      name: 'Audi'
    },
    color: {
      id: 'RED',
      name: 'RED'
    },
    name: 'Test'
  }])
})
// define the about route
router.post('/', (req, res) => {
  res.send('About birds')
})

export default router
