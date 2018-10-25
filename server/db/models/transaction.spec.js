const {expect} = require('chai')
const db = require('../index')
const Transaction = db.model('transaction')
const User = db.model('user')

describe('Transaction model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('association', () => {
    let cody
    let codyTransaction

    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      codyTransaction = await Transaction.create({
        type: 'sale',
        shares: 100,
        pricePerShare: 132.05
      })
      codyTransaction.setUser(cody)
      cody.updateBalance(codyTransaction)
    })

    it("has a userId equal to cody's", () => {
      expect(codyTransaction.userId).to.equal(cody.id)
    })

    it('has the correct total', () => {
      let total = (
        codyTransaction.shares * codyTransaction.pricePerShare
      ).toFixed(2)
      expect(codyTransaction.total).to.equal(total)
    })
    describe('user instance method', () => {
        let john
        let johnTransaction
        let johnTransaction2
        beforeEach(async () => {
            john = await User.create({
                email: 'john@email.com',
                password: 'bones'
            })
            johnTransaction = await Transaction.create({
                type: 'purchase',
                shares: 10,
                pricePerShare: 100
            })

            johnTransaction2 = await Transaction.create({
                type: 'sale',
                shares: 10,
                pricePerShare: 155.55
            })

            johnTransaction.setUser(john)
            john.updateBalance(johnTransaction)
            johnTransaction2.setUser(john)
        })
      it('updates user balance to the correct balance', () => {
        expect(cody.balance).to.equal(13205 + 5000)
      })
      it('updates balance with transaction type purchase', () => {
          expect(john.balance).to.equal(4000)
      })
      it('can handle floating numbers', () => {
          john.updateBalance(johnTransaction2)
          expect(john.balance).to.equal(4000 + 155.55 * 10)
      })
    })
  })
})
