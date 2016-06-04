import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App/App'

import 'semantic-ui/dist/semantic.min.css'
import './app.css'
// import 'font-awesome/css/font-awesome.css'

import makeRoutes from './routes'
const routes = makeRoutes()

const mountNode = document.querySelector('#root')

ReactDOM.render(
  <App routes={routes} />,
  mountNode
)
