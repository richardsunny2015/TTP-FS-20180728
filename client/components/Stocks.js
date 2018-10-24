import React from 'react'
import {connect} from 'react-redux'

const Stocks = props => {
  const {stocks} = props
  return (
    <section>
      {stocks.map(stock => (
        <div key={stock.symbol}>
          <h4>{stock.symbol}</h4>
          <p>Current Price: {stock.price}</p>
          <button>Buy</button>
        </div>
      ))}
    </section>
  )
}

export default Stocks
