import axios from 'axios'
import {toastr} from 'react-redux-toastr'
import socket from '../socket'
import {fetchOpenPrices} from './openPrices'
import {updatePricesHelper} from '../utilities'

/**
 * ACTION TYPES
 */
const GET_STOCKS = 'GET_STOCKS'
export const REMOVE_STOCKS = 'REMOVE_STOCKS'
const UPDATE_PRICES = 'UPDATE_PRICES'

/**
 * INITIAL STATE
 */
const defaultCurrentStocks = []

/**
 * ACTION CREATORS
 */
export const getStocks = currentStocks => ({type: GET_STOCKS, currentStocks})
export const removeStocks = () => ({type: REMOVE_STOCKS})
export const updatePrices = stock => ({type: UPDATE_PRICES, stock})

/**
 * THUNK CREATORS
 */

export const fetchStocks = stocks => async dispatch => {
  try {
    const res = await axios.get(
      `https://api.iextrading.com/1.0/tops/last?symbols=${stocks.join()}`
    )
    if (res.data.length) {
      dispatch(getStocks(res.data))
      dispatch(fetchOpenPrices(stocks))
      socket.emit('subscribe', stocks.join())
    } else {
      toastr.warning(
        'Invalid Ticker Symbol',
        'Please search with valid ticker symbols'
      )
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default (state = defaultCurrentStocks, action) => {
  switch (action.type) {
    case GET_STOCKS:
      return action.currentStocks
    case REMOVE_STOCKS:
      return defaultCurrentStocks
      case UPDATE_PRICES:
       return updatePricesHelper(state, action.stock)
    default:
      return state
  }
}
