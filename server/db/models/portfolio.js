const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shares: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = Portfolio
Portfolio.prototype.updateShares = function(transaction) {
    if (transaction.type === 'purchase') {
        this.shares = this.shares + transaction.shares
    } else {
        this.shares = this.shares - transaction.shares
    }
}

