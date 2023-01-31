const router = require("express").Router();
module.exports = router;

const {
  models: { Project, Client },
} = require("../db");

// All projects route
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.send(projects);
  } catch (error) {
    console.log("Error in all projects route");
    next(error);
  }
});

router.get("/cat/:category", async (req, res, next) => {
  try {
    const projects = await Project.findAll({ where: {category: req.params.category}});
    res.send(projects);
  } catch (error) {
    console.log("Error in all projects route");
    next(error);
  }
});

// All projects for individual client route
router.get("/client/:clientId", async (req, res, next) => {
    try {
      const projects = await Project.findAll({ where: {clientId: req.params.clientId}});
      res.send(projects);
    } catch (error) {
      console.log("Error in all projects route");
      next(error);
    }
  });

  router.get("/freelancer/:freelancerId", async (req, res, next) => {
    try {
      const projects = await Project.findAll({ where: {freelancerId: req.params.freelancerId}});
      res.send(projects);
    } catch (error) {
      console.log("Error in all projects route");
      next(error);
    }
  });


// Single project route
router.get("/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId, {include: Client});
    res.send(project);
  } catch (error) {
    console.log("error in single product route");
    next(error);
  }
});

// create project route
router.post("/", async (req, res, next) => {
  try {
    const { project } = await Project.create(req.body);
    res.send(project);
  } catch (error) {
    console.log("error in post product route");
    next(error);
  }
});

// Update project route
router.put("/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    res.send(await project.update(req.body));
  } catch (error) {
    console.log("Error in update project route");
    next(error);
  }
});

// Delete project route
router.delete("/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    res.send( await project.destroy());
  } catch (error) {
    console.log("Error in delete product route");
    next(error);
  }
});
