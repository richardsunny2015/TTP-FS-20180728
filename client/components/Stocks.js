import React from 'react'
import {connect} from 'react-redux'
import {me, updateShares} from '../store'
import {purchaseSubmit} from '../utilities'

const Stocks = props => {
  const {
    stocks,
    userId,
    shares,
    balance,
    fetchBalance,
    updatePortfolio
  } = props
  const isPortfolio = props.isPortfolio || false

  return (
    <section>
      {stocks.map((stock, idx) => (
        <div key={stock.symbol}>
          <h4>{stock.symbol}</h4>
          <p>Current Price: {stock.price}</p>
          {isPortfolio && <p># of Shares Owned: {shares[idx]}</p>}
          <form
            onSubmit={purchaseSubmit(
              stock,
              userId,
              balance,
              fetchBalance,
              updatePortfolio,

            )}
          >
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
