import {expect} from 'chai'
import updatePricesHelper from './updatePricesHelper'

describe('updatePricesHelper', () => {
  let currentStocks
  let updatedStock

  beforeEach(() => {
    currentStocks = [
      {
        price: 216.11,
        size: 100,
        symbol: 'AAPL'
      },
      {
        price: 148.6,
        size: 100,
        symbol: 'FB'
      },
      {
        price: 57.89,
        size: 100,
        symbol: 'B'
      }
    ]
    updatedStock = {
      symbol: 'B',
      size: 100,
      price: 57.9
    }
  })
  it('returns an array', () => {
    expect(updatePricesHelper(currentStocks, updatedStock)).to.be.an('array')
  })
  it('does not mutate currentStocks array', () => {
    let currentStocksCopy = currentStocks.slice()
    expect(updatePricesHelper(currentStocksCopy, updatedStock)).to.not.equal(
      currentStocksCopy
    )
  })
  it('updates price of target stock', () => {
    let nextArray = [
      {
        price: 216.11,
        size: 100,
        symbol: 'AAPL'
      },
      {
        price: 148.6,
        size: 100,
        symbol: 'FB'
      },
      {
        price: 57.9,
        size: 100,
        symbol: 'B'
      }
    ]
    expect(updatePricesHelper(currentStocks, updatedStock)).to.eql(nextArray)
  })
  it('adds a new stock if it is not in currentStock', () => {
    const newStock = {
      price: 60,
      size: 100,
      symbol: 'F'
    }
    expect(updatePricesHelper(currentStocks, newStock)).to.eql([...currentStocks, newStock])
  })
})
