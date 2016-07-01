import {
  LOADING_START,
  LOADING_STOP,
} from 'actions/app'

const INITIAL_STATE = {
  isLoading: false,
  count: 0,
}

function app(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
        count: state.count + 1,
      }
    case LOADING_STOP: {
      const count = state.count > 0 ? state.count - 1 : 0
      return {
        ...state,
        count,
        isLoading: count > 0,
      }
    }
    default:
      return state
  }
}

export default app
