import React, { PropTypes } from 'react'
import { browserHistory, Router, Redirect } from 'react-router'

const App = ({ routes }) => (
  <Router history={browserHistory}>
    {routes}
    <Redirect from='*' to='/' />
  </Router>
)

App.propTypes = {
  routes: PropTypes.object.isRequired,
}

export default App
