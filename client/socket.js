import io from 'socket.io-client'
import store, {getStocks} from './store'
let state = store.getState()
let prevSymbols = ''
let currentSymbols = ''
const url = 'https://ws-api.iextrading.com/1.0/last'
const socket = io(url)
let counter = 0
const unsubscribe = store.subscribe(() => {
  prevSymbols = state.currentStocks.map(stock => stock.symbol).join()
  state = store.getState()
  currentSymbols = state.currentStocks.map(stock => stock.symbol).join()
  socket.close()
  socket.open()
})
socket.on('connect', () => {
  socket.emit('unsubscribe', prevSymbols)
  socket.emit('subscribe', currentSymbols)
})

socket.on('message', message => {
  let stockList = JSON.parse(message)
  if (!Array.isArray(stockList)) stockList = [stockList]
  store.dispatch(getStocks(stockList))
  counter++
})

// socket.on('disconnect', () => {
//   socket.open()
// })

export default socket
