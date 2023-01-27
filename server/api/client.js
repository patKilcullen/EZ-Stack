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
    const client = await Client.findByPk(req.params.id, {include: Project})
    res.send(client)
  }catch(err){
    next(err)
  }
})

// //PUT client update information
// router.put("/:id", async (req, res, next) => {
//   try {
//     // if request body has token
//     if (req.headers.authorization) {
//       // user is the one with token
//       const client = await Client.findByToken(req.headers.authorization);
//       // user can update their information
//       res.status(200).send(await client.update(req.body));
//     } else {
//       // if user doesn't have a token and is a guest
//       const client = await Client.findByPk(req.params.id);
//       if (!client) {
//         let err = new Error("sorry cannot edit client at this time");
//         next(err);
//       }
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.put('/:id', async (req, res, next) => {
  try{
    const client = await Client.findByPk(req.params.id)
    res.send(await client.update(req.body))
  }catch(err){
    next(err)
  }
})
