import axios from 'axios'
import {fetchStocks} from './currentStocks'
import {updateSharesHelper} from '../utilities'
/**
 * ACTION TYPES
 */

const GET_PORTFOLIO = 'GET_PORTFOLIO'
const UPDATE_SHARES = 'UPDATE_SHARES'

/**
 * INITIAL STATE
 */

const defaultPortfolio = []

/**
 * ACTION CREATORS
 */

export const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
export const updateShares = stock => ({type: UPDATE_SHARES, stock})

/**
 * THUNK CREATORS
 */

export const fetchPortfolio = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/portfolio`)
    dispatch(getPortfolio(res.data))
    const symbols = res.data.map(stock => stock.symbol)
    dispatch(fetchStocks(symbols))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */

export default (state = defaultPortfolio, action) => {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio
    case UPDATE_SHARES:
      // make copy of state, find stock by symbol, change shares property
      return updateSharesHelper(state, action.stock)
    default:
      return state
  }
}
