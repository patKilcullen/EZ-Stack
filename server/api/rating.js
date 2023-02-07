const router = require("express").Router();
module.exports = router;

const {
  models: { Rating, Project, Freelancer  },
} = require("../db");

// All ratings route
router.get("/", async (req, res, next) => {
  try {
    const rating = await Rating.findAll();
    res.send(rating);
  } catch (error) {
    console.log("Error in all projects route");
    next(error);
  }
});


// All projects for individual client route
router.get("/:freelancerId", async (req, res, next) => {
    try {
      const rating = await Rating.findAll({ where: {freelancerId: req.params.freelancerId},include: [Project, Freelancer ]});
      res.send(rating);
    } catch (error) {
      console.log("Error in all rating route");
      next(error);
    }
  });


  // RATING BY PROJECT ANF FREELANCER
router.get("/:projectId/:freelancerId", async (req, res, next) => {
  try {
    const rating = await Rating.findOne({ where: {freelancerId: req.params.freelancerId, projectId:req.params.projectId },include: Project });
    console.log("RARA RATING: ", rating)
    res.send(rating);
  } catch (error) {
    console.log("Error in all rating route");
    next(error);
  }
});

// create project route
router.post("/", async (req, res, next) => {
  try {
    const { rating } = await Rating.create(req.body);
    res.send(rating);
  } catch (error) {
    console.log("error in post rating route");
    next(error);
  }
});

// Update project route
router.put("/:freelancerId", async (req, res, next) => {
  try {
    const rating = await Rating.findByPk(req.params.freelancerId);
    res.send(await rating.update(req.body));
  } catch (error) {
    console.log("Error in update project route");
    next(error);
  }
});

// Delete project route
router.delete("/:freelancerId", async (req, res, next) => {
  try {
    const rating = await Rating.findByPk(req.params.freelancerId);
    res.send( await rating.destroy());
  } catch (error) {
    console.log("Error in delete product route");
    next(error);
  }
});
