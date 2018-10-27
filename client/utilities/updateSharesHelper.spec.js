import {expect} from 'chai'
import updateSharesHelper from './updateSharesHelper'

describe('updateSharesHelper', () => {
  let prevState
  let target
  beforeEach(() => {
    prevState = [
      {
        id: 1,
        symbol: 'B',
        shares: 10,
        userId: 1
      },
      {
        id: 2,
        symbol: 'FB',
        shares: 15,
        userId: 1
      }
    ]
    target = {
      id: 2,
      symbol: 'FB',
      shares: 20,
      userId: 1
    }
  })
  it('returns an array', () => {
    expect(updateSharesHelper(prevState, target)).to.be.an('array')
  })
  it('does not mutate the previous state', () => {
    let newArray = updateSharesHelper(prevState, target)
    expect(newArray).to.not.equal(prevState)
  })
  it('changes the shares of the correct', () => {
    let targetArray = [
      {
        id: 1,
        symbol: 'B',
        shares: 10,
        userId: 1
      },
      {
        id: 2,
        symbol: 'FB',
        shares: 20,
        userId: 1
      }
    ]
    expect(updateSharesHelper(prevState, target)).to.eql(targetArray)
  })
})
