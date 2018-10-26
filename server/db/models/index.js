const User = require('./user')
const Transaction = require('./transaction')
const Portfolio = require('./portfolio')

/**
 * ASSOCIATIONS
 */
Transaction.belongsTo(User)
User.hasMany(Transaction)

Portfolio.belongsTo(User)
User.hasMany(Portfolio)

module.exports = {
  User,
  Transaction,
  Portfolio
}
