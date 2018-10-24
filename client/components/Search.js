import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchStocks} from '../store'
import Stocks from './Stocks'

class Search extends Component {

  componentWillUnmount() {
    //TODO remove currentStocks from store
  }

  render() {
    const {currentStocks, handleSubmit} = this.props
    return (
      <div>
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
  currentStocks: state.currentStocks
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault()
    dispatch(fetchStocks([evt.target.search.value]))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
