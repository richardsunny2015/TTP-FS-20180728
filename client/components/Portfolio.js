import React from 'react'
import {connect} from 'react-redux'

const Portfolio = props => {
    return (
        <div>
            <h2>Portfolio</h2>
            <h3>Cash Balance: {`$${props.balance}`}</h3>
        </div>
    )
}

const mapStateToProps = state => ({
    balance: state.user.balance
})

export default connect(mapStateToProps)(Portfolio)
