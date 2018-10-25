const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.ENUM('sale', 'purchase'),
    allowNull: false
  },
//   userId: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
  shares: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  pricePerShare: {
      type: Sequelize.FLOAT,
      allowNull: false
  },
  total: {
      type: Sequelize.VIRTUAL,
      get() {
          return (this.getDataValue('pricePerShare') * this.getDataValue('shares')).toFixed(2)
      }
  }
})

module.exports = Transaction

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */

