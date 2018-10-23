
/**
 * ACTION TYPES
 */
const GET_STOCKS = 'GET_STOCKS'

/**
 * ACTION CREATORS
 */
export const getStocks = currentStocks => ({type: GET_STOCKS, currentStocks})

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch (action.type) {
    case GET_STOCKS:
      return action.currentStocks
    default:
      return state
  }
}
