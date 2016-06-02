import React from 'react'
import { browserHistory, Router, Route, Redirect } from 'react-router'

const Home = React.createClass({
  render() {
    return (<div>Hello World</div>)
  },
})

const makeRoutes = () => (
  <Router>
    <Route path='/' component={Home} />
    <Redirect from='*' to='/' />
  </Router>
)

export default makeRoutes
