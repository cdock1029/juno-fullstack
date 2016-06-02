import React, { PropTypes } from 'react'
import { Router } from 'react-router'

const App = ({ history, routes }) => (
  <div style={{ height: '100%' }}>
    <Router
      history={history}
      routes={routes} />
  </div>
)

App.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
}

export default App
