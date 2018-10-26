import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

const Stocks = props => {
  const {stocks, userId} = props
  return (
    <section>
      {stocks.map(stock => (
        <div key={stock.symbol}>
          <h4>{stock.symbol}</h4>
          <p>Current Price: {stock.price}</p>
          <form onSubmit={purchaseSubmit(stock, userId)}>
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

const purchaseSubmit = (stockInfo, userId) => evt => {
  evt.preventDefault()
  const shares = Number(evt.target.shares.value)
  const objToSend = {
    shares,
    pricePerShare: stockInfo.price,
    type: 'purchase',
    symbol: stockInfo.symbol,
    userId
  }
  console.log(objToSend, 'our obj')
  axios
    .post('/api/transactions', objToSend)
    .then(res => res.data)
    .then(console.log)
    .catch(console.log)
}

const mapStateToProps = state => ({
  userId: state.user.id
})

export default connect(mapStateToProps)(Stocks)