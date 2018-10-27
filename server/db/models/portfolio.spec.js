const {expect} = require('chai')
const db = require('../index')
const Portfolio = db.model('portfolio')
const Transaction = db.model('transaction')
const User = db.model('user')

xdescribe('Portfolio model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('instance methods', () => {
    let cody
    let codyTransaction
    let codyTransaction2

    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      codyTransaction = await Transaction.create({
        type: 'purchase',
        symbol: 'AAPL',
        shares: 100,
        pricePerShare: 132.05
      })
      codyTransaction2 = await Transaction.create({
        type: 'sale',
        symbol: 'AAPL',
        shares: 50,
        pricePerShare: 132.05
      })
      codyTransaction.setUser(cody)
      codyTransaction2.setUser(cody)
      cody.updateBalance(codyTransaction)
    })
    xdescribe('updateShares', () => {
      let applPortfolio
      beforeEach(async () => {
        let applPortfolioArray = await Portfolio.findOrCreate({
          where: {symbol: codyTransaction.symbol, userId: cody.id}
        })
        applPortfolio = applPortfolioArray[0]
        applPortfolio.updateShares(codyTransaction)
      })
      it('adds shares to applPortfolio', () => {
        expect(applPortfolio.shares).to.equal(100)
      })
      it('removes shares on sale types', () => {
          applPortfolio.updateShares(codyTransaction2)
          expect(applPortfolio.shares).to.equal(50)
      })
    })
  })
})
