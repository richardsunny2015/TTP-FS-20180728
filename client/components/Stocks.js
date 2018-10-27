import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {me, updateShares} from '../store'

const Stocks = props => {
  const {stocks, userId, shares, balance, fetchBalance, updatePortfolio} = props
  const isPortfolio = props.isPortfolio || false

  return (
    <section>
      {stocks.map((stock, idx) => (
        <div key={stock.symbol}>
          <h4>{stock.symbol}</h4>
          <p>Current Price: {stock.price}</p>
          {isPortfolio && <p># of Shares: {shares[idx]}</p>}
          <form onSubmit={purchaseSubmit(stock, userId, balance, fetchBalance, updatePortfolio)}>
            <input type="number" name="shares" min="1" />
            <button type="submit" name="action" value="purchase">
              Buy
            </button>
          </form>
        </div>
      ))}
    </section>
  )
}

const purchaseSubmit = (stockInfo, userId, balance, fetchBalance, updatePortfolio) => evt => {
  evt.preventDefault()
  const shares = Number(evt.target.shares.value)
  const total = stockInfo.price * shares
  if (total < balance) {
    const objToSend = {
      shares,
      pricePerShare: stockInfo.price,
      type: 'purchase',
      symbol: stockInfo.symbol,
      userId
    }
    axios
      .post('/api/transactions', objToSend)
      .then(res => res.data)
      .then(updatePortfolio)
      .then(() => fetchBalance())
      .catch(console.log)
  } else {
    console.log('TOO MUCH')
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  shares: state.portfolio.map(portfolio => portfolio.shares),
  balance: state.user.balance
})

const mapDispatchToProps = dispatch => ({
  fetchBalance: () => dispatch(me()),
  updatePortfolio: stock => dispatch(updateShares(stock))
})

export default connect(mapStateToProps, mapDispatchToProps)(Stocks)
