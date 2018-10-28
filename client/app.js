import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import ReduxToastr from 'react-redux-toastr'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ReduxToastr />
    </div>
  )
}

export default App
