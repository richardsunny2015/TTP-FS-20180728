import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStocks, removeStocks, removeOpenPrices} from '../store'
import Stocks from './Stocks'

class Search extends Component {

  componentWillUnmount() {
    this.props.revertToDefault()
  }

  render() {
    const {currentStocks, handleSubmit, balance} = this.props
    return (
      <div>
        <h3>Cash Balance: {`$${balance}`}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">
            <small>Search: </small>
          </label>
          <input name="search" type="text" />
          <button type="submit">Search</button>
        </form>
        <Stocks stocks={currentStocks} />
        <p>
          Data provided for free by{' '}
          <a href="https://iextrading.com/developer">IEX</a>. View{' '}
          <a href="https://iextrading.com/api-exhibit-a/">
            IEX’s Terms of Use.
          </a>
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentStocks: state.currentStocks,
  balance: state.user.balance
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault()
    dispatch(fetchStocks([evt.target.search.value]))
  },
  revertToDefault: () => {
    dispatch(removeStocks())
    dispatch(removeOpenPrices())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
