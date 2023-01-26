const router = require('express').Router()
const { models: { Request,Freelancer }} = require('../db')
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
// router.get("/:id", async (req, res, next) => {
//     try {
//       const request = await Request.findByPk(req.params.id);
//       res.send(request);
//     } catch (err) {
//       next(err);
//     }
//   });

  //GET route  - 
router.get("/:projectId", async (req, res, next) => {
  try {
    const request = await Request.findAll({where: {projectId : req.params.projectId, status: 'PENDING'}, include: Freelancer});
    res.send(request);
  } catch (err) {
    next(err);
  }
});


// Post.findAll({
//   where: {
//     authorId: 12,
//     status: 'active'
//   }
// }).then(function (data) {
//     res.status(200).json(data)
//             })
//    .catch(function (error) {
//                 res.status(500).json(error)
//    });;
//Post.findAll({ where: {deletedAt: null, topicId: req.params.id} })

//Post.findAll({ where: {deletedAt: {$ne: null}, topicId: req.params.id} })

