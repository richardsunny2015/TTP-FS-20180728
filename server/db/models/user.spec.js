/* global xdescribe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

xdescribe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('instanceMethods', () => {
    xdescribe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

    }) // end xdescribe('correctPassword')
  }) // end xdescribe('instanceMethods')
  xdescribe('hooks', () => {
    xdescribe('onCreate', () => {
      let rich;
      beforeEach(async () => {
        rich = await User.create({
          email: 'rich@email.com',
          password: 'howdy'
        })
      })
      it('automatically has a balance when created', () => {
        expect(rich.balance).to.be.a('number');
      })
      it('should have a balance equal to 5000.00', () => {
        expect(rich.balance).to.equal(5000.00);
      })
    })
  })
}) // end xdescribe('User model')
