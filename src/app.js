import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App/App'
window.AWS.config.region = 'us-east-1'

// import 'semantic-ui/dist/semantic.css'
// import 'font-awesome/css/font-awesome.css'
import './app.css'

import configureStore from 'data/store'
import makeRoutes from 'routes'

/* TODO: HACK to fix react-google-login - is looking for script tag */
// const s = document.createElement('script')
// const body = document.getElementsByTagName('body')[0]
// body.appendChild(s)

const store = configureStore()
window.addEventListener('google-loaded', () => {
  console.log('google-loaded..')
  // store.dispatch(loadingStart())
})

ReactDOM.render(
  <App routes={makeRoutes()} store={store} />,
  document.querySelector('#root')
)
