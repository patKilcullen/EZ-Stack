const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/clients', require('./client'))
router.use('/freelancers', require('./freelancers'))
router.use('/requests', require('./request'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
