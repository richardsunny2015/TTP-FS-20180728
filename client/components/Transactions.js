import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store'

class Transactions extends Component {
  componentDidMount() {
    this.props.fetchTransactionsOnDidMount(this.props.userId)
  }
  render() {
    const {transactions} = this.props
    return (
      <section>
        {transactions.map(transaction => (
          <div key={transaction.id}>
            <h4>{transaction.type.slice(0, 1).toUpperCase() + transaction.type.slice(1)}</h4>
            <p>Price Per Share: {transaction.pricePerShare}</p>
            <p># of Shares: {transaction.shares}</p>
            <p>Total: {transaction.total}</p>
          </div>
        ))}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  fetchTransactionsOnDidMount: userId => dispatch(fetchTransactions(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
