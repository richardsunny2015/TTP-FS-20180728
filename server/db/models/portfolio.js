const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shares: {
        type: Sequelize.INTEGER
    }
})

module.exports = Portfolio
