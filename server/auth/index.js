const router = require('express').Router()
module.exports = router

router.use('/client', require('./client'))
router.use('/freelancer', require('./freelancer'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
