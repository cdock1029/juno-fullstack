import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import user from './user'
import app from './app'
import graphql from './graphql'

const rootReducer = combineReducers({
  routing,
  form,
  app,
  user,
  graphql,
})

export default rootReducer
