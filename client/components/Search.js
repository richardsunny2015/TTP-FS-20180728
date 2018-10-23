import React, {Component} from 'react'
import axios from 'axios'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
        stock: {}
    }
  }
  handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const stock = await axios
        .get(`https://api.iextrading.com/1.0/stock/${evt.target.search.value}/quote`)
        .then(res => res.data)
      this.setState({stock})
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {stock} = this.state
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
            </div>
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
