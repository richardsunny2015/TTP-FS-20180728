import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchStocks} from '../store'
import Stocks from './Stocks'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: () => {},
      startInterval: false
    }
  }
  componentDidMount() {
    console.log(this.state.startInterval)
    if (this.state.startInterval) {
      let onIntervalFunc = setInterval(this.props.onInterval(this.props.currentStocks), 1000)
      this.setState({interval: onIntervalFunc})
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  handleSubmit = evt => {
    this.setState({startInterval: true})
    evt.preventDefault()
    this.props.dispatchQuery(evt)
  }

  render() {
    const {currentStocks} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
  dispatchQuery: evt => {
    // evt.preventDefault()
    dispatch(fetchStocks([evt.target.search.value]))
  },
  onInterval: stocks => () => {
    dispatch(fetchStocks(stocks))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
