import React from 'react'
import { Route } from 'react-router'
import Root from 'containers/Root/Root'

import mainRoutes from 'routes/routes'

const makeRoutes = () => (
  <Route component={Root}>
    {mainRoutes()}
  </Route>
)

export default makeRoutes
