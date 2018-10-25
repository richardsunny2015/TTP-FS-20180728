const router = require('express').Router()
const {User, Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/transactions', async (req, res, next) => {
  const {userId} = req.params

  if (req.user.id !== Number(userId)) {
    res.status(403).send('Forbidden')
  } else {
    try {
      const user = await User.findOne({
        where: {id: userId},
        include: [{model: Transaction}]
      })
      const transactions = user.transactions
      res.status(200).send(transactions)
    } catch (err) {
      next(err)
    }
  }
})
