import axios from 'axios'
import {toastr} from 'react-redux-toastr'

const purchaseSubmit = (
  stockInfo,
  userId,
  balance,
  fetchBalance,
  updatePortfolio
) => evt => {
  evt.preventDefault()
  const shares = Number(evt.target.shares.value)
  const total = stockInfo.price * shares
  if (total < balance) {
    const objToSend = {
      shares,
      pricePerShare: stockInfo.price,
      type: 'purchase',
      symbol: stockInfo.symbol,
      userId
    }
    axios
      .post('/api/transactions', objToSend)
      .then(res => res.data)
      .then(updatePortfolio)
      .then(() => fetchBalance())
      .catch(console.log)
  } else {
    toastr.warning(
      'Insufficient Funds',
      'Please deposit more funds into your account'
    )
  }
}

export default purchaseSubmit
