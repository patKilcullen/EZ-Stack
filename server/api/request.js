const router = require('express').Router()
const { models: { Request }} = require('../db')
module.exports = router


//GET route /api/requests
router.get('/', async (req, res, next) => {
  console.log("HELLO")
    try{
        const requests = await Request.findAll();
        res.send(requests)
    }catch(err) {
        next(err)
    }
});

//GET route  - 
router.get("/:id", async (req, res, next) => {
    try {
      const request = await Request.findByPk(req.params.id);
      res.send(request);
    } catch (err) {
      next(err);
    }
  });




