import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STOCKS = 'GET_STOCKS'

/**
 * INITIAL STATE
 */
const defaultCurrentStocks = []

/**
 * ACTION CREATORS
 */
export const getStocks = currentStocks => ({type: GET_STOCKS, currentStocks})

/**
 * THUNK CREATORS
 */

export const fetchStocks = stocks => async dispatch => {
  try {
    const res = await axios.get(
      `https://api.iextrading.com/1.0/tops/last?symbols=${stocks.join()}`
    )
    dispatch(getStocks(res.data))
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
    default:
      return state
  }
}
