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
            <h4>{transaction.total}</h4>
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
