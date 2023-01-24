const router = require('express').Router()
const { models: { Client }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const clients = await Client.findAll()
    res.send(clients)
  }catch(err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const client = await Client.findByPk(req.params.id)
    res.send(client)
  }catch(err){
    next(err)
  }
})
