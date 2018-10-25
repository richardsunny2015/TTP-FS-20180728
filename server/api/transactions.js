const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  const {pricePerShare, shares, userId, type} = req.body
  try {
    const transaction = await Transaction.create({
      pricePerShare,
      shares,
      userId,
      type
    })
    res.status(201).send(transaction)
  } catch (err) {
    next(err)
  }
})
