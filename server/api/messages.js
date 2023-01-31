const router = require("express").Router();
module.exports = router;

const {
  models: { Message },
} = require("../db");

router.get('/client/:id', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {clientId: req.params.id}})
      res.send(messages)
  } catch (error) {
    next(error);
  }
});
router.get('/freelancer/:id', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {freelancerId: req.params.id}})
      res.send(messages)
  } catch (error) {
    next(error);
  }
});

router.get('/client/conversation/:id', async (req, res, next) => {
  try{
    const messages = await Message.findAll({
      where:
      {freelancerId: req.params.id,
      clientId: req.query.clientId}
    })
    res.send(messages)
  }catch(err){
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const message = await Message.create(req.body)
    res.send(message)
  }catch(err){
    next(err)
  }
})

router.get('/freelancer/conversation/:id', async (req, res, next) => {
  try{
    const messages = await Message.findAll({
      where:
      {clientId: req.params.id,
      freelancerId: req.query.freelancerId}
    })
    res.send(messages)
  }catch(err){
    next(err)
  }
})

router.put('/client/:id', async (req, res, next) => {
  try{
    const message = await Message.findByPk(req.params.id)
    res.send(await message.update(req.body))
  }catch(err){
    next(err)
  }
})
