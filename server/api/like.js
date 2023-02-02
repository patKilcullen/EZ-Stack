const router = require("express").Router();
module.exports = router;

const {
  models: { Like, Project },
} = require("../db");

router.get('/:id', async (req, res, next) => {
  try {
    const likedProjects = await Like.findAll({include: Project, where: {freelancerId: req.params.id}})
    res.send(likedProjects)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const like = await Like.create(req.body)
    res.send(like)
  }catch(err){
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const like = await Like.findByPk(req.params.id)
    res.send(like.destroy())
  }catch(err){
    next(err)
  }
})

router.get('/check/:id', async (req, res, next) => {
  try{
    const like = await Like.findAll({where: {freelancerId: req.params.id, projectId: req.query.projectId}})
    if(like){
    res.send(like)
    }else{
      res.send('no like LOL')
    }
  }catch(err){
    next(err)
  }
})
