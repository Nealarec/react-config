import React from 'react'
import store from 'store'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Hello from 'views'

var div = document.createElement('app')
var App = () => (
  <Provider store={store}>
    <Hello />
  </Provider>
)
render(<App />, div)

document.body.appendChild(div)
