import io from 'socket.io-client'
import store, {getStocks} from './store'

const url = 'https://ws-api.iextrading.com/1.0/last'
const socket = io(url)


socket.on('message', message => {
  let stockList = JSON.parse(message)
  console.log('what is this?', stockList)
  if (!Array.isArray(stockList)) stockList = [stockList] // TODO CREATE A HELPER FUNCTION THAT EITHER UPDATES PRICES OR ADDS ANOTHER STOCK
  store.dispatch(getStocks(stockList))
})

export default socket
