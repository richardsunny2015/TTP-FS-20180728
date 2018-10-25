import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */

const defaultTransactions = []

/**
 * ACTION CREATORS
 */

const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

/**
 * THUNK CREATORS
 */

export const fetchTransactions = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/transactions`)
    dispatch(getTransactions(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default (state = defaultTransactions, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}
