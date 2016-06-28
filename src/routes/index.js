import React from 'react'
import { Route } from 'react-router'
import Root from 'containers/Root/Root'

import Dashboard from 'containers/Dashboard/Dashboard'
import DataContainer from 'containers/DataContainer/DataContainer'

const makeRoutes = () => (
  <Route component={Root}>
    <Route path='/' component={Dashboard}>
      <Route path='data' component={DataContainer} />
    </Route>
  </Route>
)

export default makeRoutes
