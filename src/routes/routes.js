import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Dashboard from 'containers/Dashboard/Dashboard'
import DataContainer from 'containers/DataContainer/DataContainer'

const mainRoutes = () => (
  <Route path='/' component={Dashboard}>
    <Route path='data' component={DataContainer} />
  </Route>
)

export default mainRoutes
