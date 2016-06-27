import { combineReducers } from 'redux'
import { LOGIN_SUCCESS, LOGIN_FAIL } from './actions'

function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        action,
      }
    case LOGIN_FAIL:
      break
    default:
      return state
  }
}

export default user
