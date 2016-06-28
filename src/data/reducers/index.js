import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import user from './user'

const rootReducer = combineReducers({
  routing,
  form,
  user,
})

export default rootReducer
