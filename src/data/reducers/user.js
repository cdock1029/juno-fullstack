import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from 'actions/user'

const INITIAL_STATE = {
  signedIn: false,
  gId: '',
  gName: '',
  gImageUrl: '',
  gEmail: '',
}

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case LOGIN_FAIL:
      return INITIAL_STATE
    case LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default user
