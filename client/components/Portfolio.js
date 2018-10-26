import React, {Component} from 'react'
import {connect} from 'react-redux'

class Portfolio extends Component {

  render() {
    return (
      <div>
        <h2>Portfolio</h2>
        <h3>Cash Balance: {`$${this.props.balance}`}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  balance: state.user.balance
})

export default connect(mapStateToProps)(Portfolio)
