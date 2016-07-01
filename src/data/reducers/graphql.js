import {
  GRAPHQL_START,
  GRAPHQL_SUCCESS,
  GRAPHQL_FAIL,
} from 'actions/graphql'

const INITIAL_STATE = {
  data: null,
  error: '',
}

function graphql(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GRAPHQL_START:
      return {
        ...state,
      }
    case GRAPHQL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        // TODO list of messages
        error: '',
      }
    case GRAPHQL_FAIL:
      return {
        ...state,
        data: null,
        error: action.payload,
      }
    default:
      return state
  }
}

export default graphql
