import axios from 'axios'
import {fetchStocks} from './currentStocks'
/**
 * ACTION TYPES
 */

const GET_PORTFOLIO = 'GET_PORTFOLIO'

/**
 * INITIAL STATE
 */

const defaultPortfolio = []

/**
 * ACTION CREATORS
 */

export const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

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
    default:
      return state
  }
}
