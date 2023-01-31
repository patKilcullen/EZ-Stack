const router = require('express').Router()
const { models: { Freelancer, Project}} = require('../db')
const Request = require('../db/models/Request')
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

  //GET route by ProjectID - 
router.get("/product/:projectId/", async (req, res, next) => {
  console.log("HOLA: ")
  try {
      const request = await Request.findAll({where: {projectId : req.params.projectId}, include: [Freelancer, Project]});
    // const request = await Request.findAll({where: {projectId : req.params.projectId, status: 'PENDING'}, include: Freelancer});
    res.send(request);
  } catch (err) {
    next(err);
  }
});

// GET REQUESTS BY FREELANCERID
router.get("/freelancer/:freelancerId", async (req, res, next) => {
  console.log("HOLA: ")
  try {
      const request = await Request.findAll({where: {freelancerId : req.params.freelancerId}, include: [Freelancer, Project]});
    // const request = await Request.findAll({where: {projectId : req.params.projectId, status: 'PENDING'}, include: Freelancer});

    res.send(request);
  } catch (err) {
    next(err);
  }
});


// Update Request Status
router.put("/:projectId", async (req, res, next) => {
  console.log("REQ BODY: ", req.body)
  try {
    const request = await Request.findAll({where: {projectId : req.params.projectId, freelancerId: req.body.freelancerId}});
    res.send(await request[0].update(req.body));
  } catch (error) {
    console.log("Error in update project route");
    next(error);
  }
});



// create request

router.post("/", async (req,res,next)=>{
try{
const  request  = await Request.create(req.body)
res.send(request)
}catch(error){
  console.log("Error in create request route");
    next(error);
}

})

router.delete("/:projectId/:freelancerId", async (req, res, next) => {
  // console.log("DELETE REQUES Route", req.body)
  try {
    const request = await Request.findAll({where: {projectId : req.params.projectId, freelancerId: req.params.freelancerId}})
    console.log("REQUESTccccL ", request)
    res.send( await request[0].destroy());
  } catch (error) {
    console.log("Error in delete request route");
    next(error);
  }
});

// get request by Project and Freelance
router.get("/:projectId/:freelancerId", async (req, res, next) => {
  // console.log("DELETE REQUES Route", req.body)
  try {
    const request = await Request.findAll({where: {projectId : req.params.projectId, freelancerId: req.params.freelancerId}})
 console.log("REQUEST CHECK: ", request)
    res.send(request);
  } catch (error) {
    console.log("Error in find by projectId/freelancerId route");
    next(error);
  }
});