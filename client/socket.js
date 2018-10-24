import io from 'socket.io-client'
const url = 'https://ws-api.iextrading.com/1.0/last'
const socket = io(url)

socket.on('message', message => console.log(JSON.parse(message)))
socket.on('connect', () => {
  socket.emit('subscribe', 'aapl')
})

export default socket
