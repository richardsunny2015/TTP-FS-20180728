import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchPortfolio,
  removeStocks,
  removeOpenPrices,
  removePortfolio
} from '../store'
import Stocks from './Stocks'

class Portfolio extends Component {
  componentDidMount() {
    this.props.listPortfolio(this.props.userId)
  }
  componentWillUnmount() {
    this.props.revertToDefault()
  }
  render() {
    const {balance, currentStocks} = this.props
    return (
      <div>
        <h2>Portfolio</h2>
        <h3>Cash Balance: {`$${balance}`}</h3>
        <Stocks stocks={currentStocks} isPortfolio={true} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  balance: state.user.balance,
  userId: state.user.id,
  currentStocks: state.currentStocks
})

const mapDispatchToProps = dispatch => ({
  listPortfolio: userId => dispatch(fetchPortfolio(userId)),
  revertToDefault: () => {
    dispatch(removeStocks())
    dispatch(removeOpenPrices())
    dispatch(removePortfolio())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
