const router = require('express').Router()
const {Transaction, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  const {pricePerShare, shares, userId, type, symbol} = req.body
  try {
    const transaction = await Transaction.create({
      pricePerShare,
      shares,
      type,
      symbol
    })
    const user = await User.findById(userId)
    transaction.setUser(user)
    user.updateBalance(transaction)
    await user.save()
    await transaction.save()
    res.status(201).send(transaction)
  } catch (err) {
    next(err)
  }
})