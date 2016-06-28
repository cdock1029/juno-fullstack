import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { browserHistory, Router, Redirect } from 'react-router'

const App = ({ routes, store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
      <Redirect from='*' to='/' />
    </Router>
  </Provider>
)

App.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default App
