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
// router.get("/:projectId", async (req, res, next) => {
//   try {
//       const request = await Request.findAll({where: {projectId : req.params.projectId}, include: Freelancer});
//     // const request = await Request.findAll({where: {projectId : req.params.projectId, status: 'PENDING'}, include: Freelancer});
//     res.send(request);
//   } catch (err) {
//     next(err);
//   }
// });


// Update Request Status
router.put("/:projectId", async (req, res, next) => {
  console.log("REQ BODY: ", req.body.freelancerId)
  try {
    const project = await Request.findAll({where: {projectId : req.params.projectId, freelancerId: req.body.freelancerId}});
    res.send(await project.update(req.body));
  } catch (error) {
    console.log("Error in update project route");
    next(error);
  }
});


