import React, {Component} from 'react'
import axios from 'axios'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      stock: {},
      error: false
    }
  }
  handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const stock = await axios
        .get(
          `https://api.iextrading.com/1.0/stock/${
            evt.target.search.value
          }/quote`
        )
        .then(res => res.data)
      this.setState({stock, error: false})
    } catch (err) {
      this.setState({stock: {}, error: true})
    }
  }

  render() {
    const {stock, error} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">
            <small>Search: </small>
          </label>
          <input name="search" type="text" />
          <button type="submit">Search</button>
        </form>
        {stock.symbol && (
          <div>
            <h4>{stock.symbol}</h4>
            <p>Current Price: {stock.latestPrice}</p>
            <button>Buy</button>
          </div>
        )}
        {error && (
            <h4>Please search using valid ticker symbols</h4>
        )}
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
