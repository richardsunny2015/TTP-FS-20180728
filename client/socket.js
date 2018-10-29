import io from 'socket.io-client'
import store, {updatePrices} from './store'

const url = 'https://ws-api.iextrading.com/1.0/last'
const socket = io(url)


socket.on('message', message => {
  let stock = JSON.parse(message)
  console.log('heyy', stock)
  store.dispatch(updatePrices(stock))
})

export default socket
