const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/clients', require('./client'))
router.use('/freelancers', require('./freelancers'))
router.use('/projects', require('./project'))
router.use('/requests', require('./request'))
router.use('/messages', require('./messages'))
router.use('/ratings', require('./rating'))
router.use('/likes', require('./like'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
