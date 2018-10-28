import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import currentStocks from './currentStocks'
import transactions from './transactions'
import portfolio from './portfolio'
import {reducer as toastr} from 'react-redux-toastr'

const reducer = combineReducers({user, currentStocks, transactions, portfolio, toastr})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './portfolio'
export * from './transactions'
export * from './user'
export * from './currentStocks'
