import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_OPEN_PRICES = 'GET_OPEN_PRICES'

/**
 * ACTION CREATORS
 */
const getOpenPrices = openPrices => ({
  type: GET_OPEN_PRICES,
  openPrices
})

/**
 * INITIAL STATE
 */
const defaultState = []

/**
 * THUNK CREATORS
 */
export const fetchOpenPrices = symbols => async dispatch => {
  try {
    let openPricesArray = []
    for (let i = 0; i < symbols.length; i++) {
      const res = await axios.get(
        `https://api.iextrading.com/1.0/stock/${symbols[i]}/ohlc`
      )
      openPricesArray.push(res.data.open.price)
    }
    dispatch(getOpenPrices(openPricesArray))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_OPEN_PRICES:
      return action.openPrices
    default:
      return state
  }
}
