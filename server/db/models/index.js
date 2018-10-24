const User = require('./user')
const Transaction = require('./transaction')

/**
 * ASSOCIATIONS
 */
Transaction.belongsTo(User)
User.hasMany(Transaction)

module.exports = {
  User,
  Transaction
}
