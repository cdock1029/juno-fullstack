import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App/App'

import 'font-awesome/css/font-awesome.css'
import './app.css'

import makeRoutes from './routes'
import { browserHistory } from 'react-router'

const routes = makeRoutes()
const mountNode = document.querySelector('#root')

ReactDOM.render(
  <App history={browserHistory} routes={routes} />,
  mountNode
)
