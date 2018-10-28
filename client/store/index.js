import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import currentStocks from './currentStocks'
import transactions from './transactions'
import portfolio from './portfolio'
import canAfford from './canAfford'

const reducer = combineReducers({user, currentStocks, transactions, portfolio, canAfford})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './canAfford'
export * from './portfolio'
export * from './transactions'
export * from './user'
export * from './currentStocks'
