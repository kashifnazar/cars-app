import express from 'express'
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
  
  res.send([{
    
  }])

})
// define the about route
router.post('/', (req, res) => {
  res.send('About birds')
})

export default router