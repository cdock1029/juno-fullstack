import { applyMiddleware, createStore } from 'redux'

// import middlewares
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

export default function configureStore() {
  const middleware = applyMiddleware(
    thunk,
    routerMiddleware(browserHistory),
    createLogger(),
  )

  const store = createStore(
    rootReducer,
    middleware
  )

  return store
}
