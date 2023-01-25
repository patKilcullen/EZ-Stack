const router = require('express').Router()
const { models: { Client, Project }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const clients = await Client.findAll()
    res.send(clients)
  }catch(err){
    next(err)
  }
})


//Get request to view client's projects
router.get('/:id', async (req, res, next) => {
  try{
    const client = await Client.findByPk(req.params.id, {
      include: [Project]
    }) 
    res.send(client)
  }catch(err){
    next(err)
  }
})

//PUT client update information
//
